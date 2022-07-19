const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");

//Create New User

const exists = async (request,response,next)=> {
    let existingMails = await User.find({}).select('email');
    let existingUsernames = await User.find({}).select('username');

    existingMails = existingMails.some(user=> user.email == request.body.email);
    existingUsernames = existingUsernames.some(user=> user.username == request.body.username);

    if (existingMails) {
        response.status(409).json("Email Already Exists");
    } else if (existingUsernames) {
        response.status(409).json("Username Already Exists");
    } else {next();}
}

router.post('/register', exists, async (request,response)=> {
        const newUser = new User(request.body);
        try {
            newUser.password = await bcrypt.hash(newUser.password, 12);
            await newUser.save();
            response.status(200).json(newUser);
        } catch(error) { response.status(500).json(error); }
});

//Login 
router.post('/login', async (request,response)=> {
    const user = await User.findOne({email: request.body.email});
    let flag = false; 
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        validPassword? flag=true : flag=false;
    }
    flag? response.status(200).json(user) : response.status(404).json("Invalid Username or Password");
});


module.exports = router;