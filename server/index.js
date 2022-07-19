const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Blogs', {useNewUrlParser: true}, ()=> {
    console.log("Database Connected")
});

app.use('/post', postRoutes);
app.use('/user', userRoutes);

app.listen(3001, ()=> {
    console.log("Listening on port 3001");
})

