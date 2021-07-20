const express = require('express');
const router = express.Router();
const PostModel = require('../Models/PostModel')
const auth = require('../middlewares/auth')

//dummy image for post
const url = "https://cloud.mongodb.com/static/images/data-explorer-empty.svg"


router.post('/addpost', auth, async (req, res) => {
    try {
        //dummy data
        req.body = {

            images: [url, url],
            postedBy: "60ef9ca5f444c43690513ef2",
            lat: "11",
            lon: "12",
            country: "country",
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
        await addpost.save().then(t => t.populate('postedBy').execPopulate());
        console.log(addpost)
        res.status(200).json(addpost);
    }
    catch (err) {
        res.status(500).json(err.message);
    }



});

router.get('/allposts', async (req, res) => {
    try {
        //geting posts fron db
        const allPosts = await PostModel.find().populate('postedBy').sort('-createdAt');
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

        images: [url, url, url, url],
        postedBy: "60ef9ca5f444c43690513ef2",
        lat: "11",
        lon: "12",
        country: "country",
        city: "city",
        locality: "locality",
        spot: "spot",
        availability: "availability",
        remained: "remained",
        expires: new Date,
        ...req.body
    }
    try {

        //find post and update
        console.log(req.body);
        const allPosts = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(t => t.populate('postedBy').execPopulate());
        console.log(allPosts)
        if (allPosts) res.status(200).json(allPosts);
        else res.status(403).json("no posts found");
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        //find post and delete
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPost);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;