import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const routeSchema = new mongoose.Schema({
    RowsNum: Number,
    LeftCol: Number,
    RightCol: Number,
    Stops: [String],
    Price: Number,
    Booked:{
        type:Array,
        default: []
    },
})

export default mongoose.model('Route',routeSchema);