const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const port = process.env.PORT || 5000;
const app = express();
const authRouter = require('./Routers/authRouter')
const PostRouter = require('./Routers/PostRouter')


//middlewares
dotenv.config();
app.use(express.json());
app.use(cors());


const URI = process.env.MONGOURL;
mongoose.set('useCreateIndex', true);

//connect to mongo db
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log("connected to mogodb")
    })
    .catch((err) => {
        console.log(err.message);
    })

//routers
app.use('/api/auth', authRouter);
app.use('/api/post', PostRouter);

//listening to port 5000
app.listen(port, () => {
    console.log("listening to port", port);
})