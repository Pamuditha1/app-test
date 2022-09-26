const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const {User} = require('../modules/userModule')


router.post('/', async (req, res) => {

    // check whether the user is already registered
    
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User Already Registered.')

    //create new user object

    let newUser = new User({
        username: req.body.username ,
        email: req.body.email ,
        contactNo: req.body.contactNo ,
        contactNo2: req.body.contactNo2 ,
        nic: req.body.nic,
        address: req.body.address ,
        password: req.body.password ,
        type: req.body.type,
        district: req.body.district
    });

    //encrypt the password

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    //save user to database

    await newUser.save();

    //response

    res.status(200).send('Successfully Registered the User');

    return
    
});



module.exports = router;

