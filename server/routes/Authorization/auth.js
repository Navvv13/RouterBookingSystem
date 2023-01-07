import Router from "express";
import User from "../../models/User.js";
import { loginValidation,registerValidation,usernameValidation } from "./validation.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dayjs from 'dayjs';

const AuthRouter = Router();

AuthRouter.post('/register', async(req,res) => {
    //validation
    const {error} = registerValidation(req.body);
    if(error) return res.send({
        "success":false,
        "message":error.details[0].message
    })
    //check if user already exists
    const usernameExists = await User.findOne({username: req.body.username})
    if(usernameExists) return res.send({
        "success":false,
        "message":"Username Already Exists"
    })
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.send({
        "success":false,
        "message":"Account with this Email Already Exists"
    })
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    const user = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
    });

    try{
        const savedUser = await user.save();
        res.status(201).send({
            "success":true,
            "username":user.username
        })
    }catch(err){
        res.send({
            "success":false,
            "message":err.msg
        });
    }
})

AuthRouter.post('/validUsername', async(req,res) => {
    //validation
    const {error} = usernameValidation(req.body);
    if (error) return res.send({"valid":false});

    //checking for duplicates
    try{
        const user = await User.findOne({username:req.body.username})
        if(user) return res.send({"valid":false});

        return res.send({"valid":true});

    }catch{
        return res.send({"valid":false})
    }
})

AuthRouter.post('/login', async(req,res) => {
    //validation
    const {error} = loginValidation(req.body);
    if(error) return res.send({
        "success":false,
        "message":error.details[0].message
    });

    
    try{
        //checking if username exists
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.send({
            "success":false,
            "message":"Username does not exist"
        })

        //checking if password is correct
        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.send({
            "success":false,
            "message":"Invalid Password"
        })

        //create and assign a token
        const token = jsonwebtoken.sign({
            _id:user._id,
        },process.env.TOKEN_SECRET)

        res.cookie('token',token,{
            secure: process.env.NODE_ENV !== "development",
            httpOnly:true,
            expires: dayjs().add(30, "days").toDate(),
        })
        .send({
            "success":true,
            "token":token
        })

    }catch{
        return res.send({
            "success":false,
            "message":"server error please try again"
        })
    }
})


export default AuthRouter;