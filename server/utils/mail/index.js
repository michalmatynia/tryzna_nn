const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');
const { resetPass} = require('./resetPass_template');

// import { getSiteData } from '../redux/actions/site_actions';

require('dotenv').config();

const chooseEmailTemplate = (to, name, token, template, actionData) => {
    let data = null;

    switch (template) {
        case "welcome":
            data = {
                from: "Tryzna <info@tryzna.pl>",
                to,
                subject: `Welcome to waves ${name}`,
                html: welcome()
            }
            break;
        case "purchase":
            data = {
                from: "Tryzna <info@tryzna.pl>",
                to,
                subject: `Thanks for shopping with us ${name}`,
                html: purchase(actionData)
            }
            break;
        case "reset_password":
            data = {
                from: "Tryzna <info@tryzna.pl>",
                to,
                subject: `Hey ${name}, reset your password`,
                html: resetPass(actionData)
            }
            break;
        default:
            data;
    }

    return data
}

const sendEmail = (to, name, token, type, actionData = null) => {

    const smtpTransport = mailer.createTransport({
        secure: true, // use TLS
        port: 465 ,
        host: 'secureams4.sgcpanel.com', // mail.tryzna.pl
        auth: {
            user: 'info@tryzna.pl',
            pass: process.env.EMAIL_PASS // add as Server ENV

        },
        // tls: {
        //     // do not fail on invalid certs
        //     rejectUnauthorized: false
        //   }
    });

    const mail = chooseEmailTemplate(to, name, token, type, actionData)

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent')
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }