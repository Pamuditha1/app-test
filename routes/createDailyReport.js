const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const nodemailMailGun = require("nodemailer-mailgun-transport");

const { DailyReport } = require("../modules/dailyReportModule");
const { Item } = require("../modules/itemModule");
const { User } = require("../modules/userModule");

const emailAuth = {
  auth: {
    api_key: process.env.MAIL_API,
    domain: process.env.MAIL_DOMAIN,
  },
};

router.post("/", async (req, res) => {
  // console.log(req.body)
  // res.send('Received')

  // const {error} = validateCustomer(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  // let user = await User.findOne({ email: req.body.email});
  // if(user) return res.status(400).send('User Already Registered.')

  let newdailyReport = new DailyReport({
    timeStamp: new Date().toISOString(),
    reportNo: req.body.reportData.reportNo,
    items: req.body.reportItems,
    project: req.body.reportData.project,
    createdBy: req.body.userID,
    status: "Created",
  });
  await newdailyReport.save();

  //decrease inventory
  req.body.reportItems.forEach((i) => {
    Item.findById(i.id)
      .then((item) => {
        item.quantity = parseInt(item.quantity) - parseInt(i.quantity);
        item.save();

        return item;
      })
      .then((item) => {
        if (parseInt(item.quantity) <= parseInt(item.reorderL)) {
          User.find({ type: "Site Engineer" })
            .select("email")
            .then((u) => {
              let emails = [];
              u.forEach((e) => emails.push(e.email));
              sendReorderEmails(emails, item);
            });
        }
      });
  });

  res.status(200).send("Daily Report Successfully Created");
  return;
});
let transporter = nodemailer.createTransport(nodemailMailGun(emailAuth));

let mailContent = {
  from: "shashiprabhawijemanna@gmail.com",
  to: "",
  subject: "Item Reached Reorder Level",
  text: "",
  // html: '<h1>You can send html formatted content using Nodemailer with attachments</h1>',
  // attachments: [
  //     {
  //         filename: 'image1.png',
  //         path: appRoot + '/profilePics/image1.png'
  //     }
  // ]
};

async function getSEMails() {
  const emails = await User.find({ type: "Site Engineer" }).select("email");
  emails.forEach((e) => emails.push(e.email));

  console.log("EMail", emails);
}
function sendReorderEmails(emails, item) {
  let mailsCount = emails.length;
  let i = 0;
  let failed = 0;
  let success = 0;
  let failedMails = [];
  emails.map((e) => {
    mailContent.to = e;
    mailContent.text = `
                    Item ${item.code} - ${item.name} Reached Reorder Level

            Reorder Level - ${item.reorderL} 
            Available Quantity - ${item.quantity} 

            Projects - ${item.projects.toString()}
            Suppliers - ${item.suppliers.toString()}
        `;

    transporter.sendMail(mailContent, function (error, data) {
      if (error) {
        failed++;
        i++;
        failedMails.push(e);
        if (i == mailsCount) {
          console.log(`Unable to send mail to ${e}`, error);
          // res.status(404).send(`Unable to send mail to ${e}`)
        }
      } else {
        success++;
        i++;
        if (i == mailsCount) {
          console.log(`Email send successfully to ${e}`);
          // res.status(200).send(`Email successfully sent to ${success} mails`)
        }
      }
    });
  });
}

module.exports = router;
