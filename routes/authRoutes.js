const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the user data

        const newUser = new User(data);   //directly setting data

        //save the new user to the database
        const response = await newUser.save();
        console.log('data saved succesfully...');

        const payload = {
            id: response.id,
        }
        //console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        //console.log("token is : ", token);

        res.status(200).json({response : response, token: token});
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//login Route
router.post('/login', jwtAuthMiddleware, async (req, res)=>{
    try{
        //Extract the email and password from request body
        const {email, password} = req.body;

        //find the user by email
        const user = await User.findOne({email: email});

        //if user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate token
        const payload = {
            id: user.id,
        }

        const token = generateToken(payload);

        //return token as response
        res.json({'login succesfully ': token});
    }catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = router;