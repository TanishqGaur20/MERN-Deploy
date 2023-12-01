const nodemailer = require('nodemailer');

const express = require('express');
const router = express.Router();

const app = express();

app.use(express.json());


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "gaurtanishq07@gmail.com",
        pass: "pgll yngl ueyf cdqo",
    },
});


router.post('/otp', async (req, res) => {
    try {
        const email = req.body.email;
        // console.log(email);



        var random = Math.floor(100000 + Math.random() * 900000);
        console.log(random);
        var mailOption = {
            from: 'gaurtanishq07@gmail.com',
            to: email,
            subject: random,
        };
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('mail sent');
            }
        })
        res.status(200).json({ otp: random });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;










