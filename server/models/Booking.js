import mongoose from "mongoose";

const bookingScheme = new mongoose.Schema({
    BusNumber:String,
    seatNumber:Number,
    user:String
})

export default mongoose.model('Booking',bookingScheme);