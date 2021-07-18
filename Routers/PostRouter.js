const express = require('express');
const router = express.Router();
const PostModel = require('../Models/PostModel')

//dummy image for post
const url = "https://cloud.mongodb.com/static/images/data-explorer-empty.svg"


router.post('/addpost', async (req, res) => {
    try {
        //dummy data
        req.body = {

            images: [url, url],
            postedBy: "60ef9ca5f444c43690513ef2",
            lat: "11",
            lon: "12",
            city: "city",
            locality: "locality",
            spot: "spot",
            availability: "availability",
            remained: "remained",
            expires: "exp",
            ...req.body
        }

        //save post to database
        const addpost = await new PostModel(req.body);
        await addpost.save();
        res.status(200).json(addpost);
    }
    catch (err) {
        res.status(500).json(err.message);
    }



});

router.get('/allposts', async (req, res) => {
    try {
        //geting posts fron db
        const allPosts = await PostModel.find();
        res.status(200).json(allPosts);
    }
    catch (err) {
        res.status(500).json(err.message);
    }


});

router.get('/:id', async (req, res) => {
    try {
        //getting posts by id
        const allPosts = await PostModel.findOne({ _id: req.params.id });
        if (allPosts) res.status(200).json(allPosts);
        else res.status(403).json("no posts found");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

router.put('/:id', async (req, res) => {

    //dummy data
    req.body = {
        ...req.body,
        images: [url, url, url, url],
        postedBy: "60ef9ca5f444c43690513ef2",
        lat: "11",
        lon: "12",
        city: "city",
        locality: "locality",
        spot: "spot",
        availability: "availability",
        remained: "remained",
        expires: new Date
    }
    try {

        //find post and update
        const allPosts = await PostModel.findOneAndUpdate(req.params.id, req.body, { new: true });
        if (allPosts) res.status(200).json(allPosts);
        else res.status(403).json("no posts found");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        //find post and delete
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json("successfully deleted");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;