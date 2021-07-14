const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel')

//register router
router.get('/register', async (req, res) => {
    try {
        const user = await new userModel({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        });

        //check for user existance
        const alreadyuser = await userModel.findOne({ email: email });
        if (alreadyuser)
            return res.status(500).json("user already there,just login");

        //save user
        await user.save();
        res.status(200).json(user);

    }
    catch (err) {
        res.status(500).send(err.message)
    }

});

module.exports = router;