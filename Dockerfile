FROM node

ENV APP_ENV=test_app

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/index.js"]