const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define the person schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    mobile:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function(next){
    const user = this;

    //Hash the password only if it has been modified (or is new)
    if(!user.isModified('password')) return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(user.password, salt);

        //Override the plain password with the hashed one
        user.password = hashPassword;
        next();
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create Person model
const user = mongoose.model('User', userSchema);
module.exports = user;