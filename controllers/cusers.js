const User = require('../models/User')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Register User
const registerUser = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    } 
    
    //check if the user already exists
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send('email already Exists')
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }) 

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
}


// Login User
const loginUser = async (req,res)=>{
   
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    } 

    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('user doesnt exist')
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).send('password is wrong')
    }

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)


}

module.exports = {registerUser, loginUser}