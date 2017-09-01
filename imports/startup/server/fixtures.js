Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40yodemos.com:8c0970cbe121ddb68e32c5e727fabc9b@smtp.mailgun.org:587';
    //process.env.MAIL_URL="smtp://[YOUR_EMAIL]@gmail.com:[YOUR_PASSWORD]@smtp.gmail.com:465/";
});
