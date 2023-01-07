import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        min:6,
        max:255
    },
    username: {
        type:String,
        required:true,
        min:5,
        max:25,
        unique:true
    },
    email: {
        type:String,
        required:true,
        min:6,
        max:255,
        unique:true
    },
    admin: {
        type:Boolean,
        default:false,
    },
    password: {
        type:String,
        required:true,
        min:6,
        max:15
    },
    registration_date: {
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('User',userSchema);