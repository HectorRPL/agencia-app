Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40sandboxb82e8f80c2074fe2aa151f5c42a4aa20.mailgun.org:55ef05eb857e794d5435dab486ed6432@smtp.mailgun.org:587';
    //process.env.MAIL_URL="smtp://[YOUR_EMAIL]@gmail.com:[YOUR_PASSWORD]@smtp.gmail.com:465/";
});
