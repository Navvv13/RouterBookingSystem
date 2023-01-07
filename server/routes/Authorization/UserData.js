import Router from 'express';
import {Authorizer} from "./VerifyToken.js";
import User from '../../models/User.js';


const UserData = Router();


UserData.get('/getUserData', Authorizer, async(req,res) => {
    const user = await User.findOne({
        _id:req.user._id
    })
    return res.send({
        'success':true,
        '_id':user._id,
        'name':user.name,
        'username':user.username,
        'email':user.email,
        'admin':user.admin
    });
})

export default UserData