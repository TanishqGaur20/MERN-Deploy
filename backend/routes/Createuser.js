const express = require('express');
const router = express.Router();
const user = require('../models/userschema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwttoken = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

const SECRET_KEY = 'MYNAMEISTANISHQGAURFROMKAPASAN$#'


router.post('/emailcheck', [body('email', 'Invalid email').isEmail(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ syntaxerror: true });
        }

        const email = req.body.email;
        let userData = await user.findOne({ email });
        if (userData) {
            res.json({ exist: true });
            console.log('trueexist');
        }
        else {
            res.json({ exist: false });
        }
    })




router.post('/create', [
    body('email', 'Invalid email').isEmail(),
    body('name', 'Name must be greater then 5 character').isLength({ min: 5 }),
    body('password', 'password must be greater then 5 character').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { name, email, location, password } = req.body;
        console.log('backend', name, email, location, password);

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);


        await user.create({
            name: name,
            email: email,
            location: location,
            password: secPassword,
        })


        res.json({ success: true });



    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})





router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'password must be greater then 5 character').isLength({ min: 5 })
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;
        let userData = await user.findOne({ email });

        if (!userData) {
            return res.status(400).send({ Error: "Enter valid credentials" });
            alert("Enter valid credentials");
        }
        const pswdCompare = await bcrypt.compare(password, userData.password);
        if (!pswdCompare) {
            return res.status(400).json({ Error1: true });
            // alert("Enter valid credentials");
        }

        const data = {
            user: {
                id: userData._id
            }
        }
        // {
        //     expiresIn: '1m'
        // }
        const authtoken = jwttoken.sign(data, SECRET_KEY);
        return res.status(200).send({ success: true, authtoken: authtoken });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})





module.exports = router;


