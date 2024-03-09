
const User = require('../Modal/userModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async(req,res)=>{
    const {name,email,password,image} = req.body;
    try{
        let IsExistingUser = await User.findOne({email:email});
        if(IsExistingUser){
            return res.status(400).json({
                message:"User Already Exists"
            })
        }else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password,salt);
            const user = await new User({
                ...req.body,password:hash
            })
            await user.save()
            return res.status(201).json({
                user,message:"User registered Successfully"
            })
        }
    }catch(err){
        return res.status(400).json({
            status:"Failed",
            messages:err.message
        })
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{

        const IsUser = await User.findOne({email:email})
        if(IsUser){

            const IsCorrectPassword = bcrypt.compare(password,IsUser.password)
            if(!IsCorrectPassword){
                return res.status(200).json({
                    Message:"Incorrect Password"
                })
            }else{
                const token = jwt.sign({id:IsUser._id,name:IsUser.name,email:IsUser.email},"secretkey",{expiresIn:60*60*1000})
                const {password,...otherDetails} = IsUser._doc;
                return res.status(200).json({
                    Message:"Successfully Logged In",
                    token,
                    otherDetails
                })
            }
        }else{
            return res.status(200).json({
                Message:"Check Email Address"
            })
        }
    

    }catch(err){
        console.log(err)
        return res.status(400).json({
            err:err,
            message:err.message
        })
    }

}

module.exports = {login,register};