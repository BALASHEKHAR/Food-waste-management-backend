const express = require('express');
const router = express.Router();
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

//register router
router.post('/register', async (req, res) => {

    //dummy data
    // req.body = {
    //     ...req.body,
    //     password: "bala",
    //     email: "bala",
    //     name: "bala"
    // }


    try {

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        //check for user existance
        const alreadyuser = await UserModel.findOne({ email: req.body.email });
        if (alreadyuser)
            return res.status(500).json("user already there,just login");


        //save model
        const user = await new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword
        });


        //save user
        await user.save();

        //jwt
        const token = await jwt.sign({ userid: user._id }, process.env.JWT_SCERET_KEY);
        res.status(200).json({ token, user });

    }
    catch (err) {
        res.status(500).send(err.message)
    }

});

router.post('/login', async (req, res) => {

    try {
        // //dummy data
        // req.body = {
        //     ...req.body,
        //     password: "bala",
        //     email: "bala"
        // }

        //find if user doesnt exits
        const alreadyUser = await UserModel.findOne({ email: req.body.email });
        if (!alreadyUser)
            res.status(403).json("Plse sigup first");

        //check for password
        const isCorrectPassword = await bcrypt.compare(req.body.password, alreadyUser.password);
        if (!isCorrectPassword)
            res.status(400).json("wrong password");

        //generate token
        const token = await jwt.sign({ userid: alreadyUser._id }, process.env.JWT_SCERET_KEY);

        res.status(200).send({ token, alreadyUser });

    }


    catch (err) {
        res.status(500).send(err.message)
    }

});

router.get('/getuser', auth, async (req, res) => {

    try {
        const user = await UserModel.findById(req.auth.userid);

        if (!user) res.status(403).json("No user found");
        else res.status(200).json(user);
    }

    catch (err) {
        res.status(500).send(err.message)
    }

});

module.exports = router;