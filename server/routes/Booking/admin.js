import Router from "express";
import Booking from "../../models/Booking.js";
import Route from "../../models/Route.js";

const adminRouter = Router();

adminRouter.post('/addRoute', async(req,res)=>{
    const { RowsNum, LeftCol, RightCol, Stops, Price} = req.body;
    try{
        let route = new Route({
            RowsNum,
            LeftCol,
            RightCol,
            Stops,
            Price
        });
        console.log(route)
        const savedRoute = await route.save();
        return res.send({
            "success":true,
            "BusNumber":savedRoute._id
        })
    }catch(error){
        console.log(error)
        return res.send({
            "success":false
        })
    }
})

adminRouter.get('/allBuses', async(req,res) => {
    try{
        const data = await Route.find();
        return res.send({
            "success":true,
            "data":data
        })
    }catch(error){
        return res.send({
            "success":false
        })
    }
})


adminRouter.post('/book',async(req,res) => {
    const {BusNumber,seatNumber,user} = req.body;
    try{
        const busDetails = await Route.findOne({
            _id:BusNumber
        });
        if(busDetails.Booked && busDetails.Booked.includes(seatNumber)){
            return res.send({
                "success":false,
            })
        }
        let newbooking1 = new Booking({
            BusNumber,
            seatNumber,
            user
        })
        const newbooking = await newbooking1.save();
        const updatedRoute = await Route.updateOne({
            _id:BusNumber
        },{
            $addToSet:{
                Booked:seatNumber
            }
        })
        return res.send({
            "success":true,
            "bookingid":newbooking._id
        })
    }catch(error){
        return res.send({
            "success":false
        })
    }
})

adminRouter.post('/mybookings',async(req,res) => {
    const {user} = req.body;
    try{

        const data = await Booking.find({
            user:user
        })
        return res.send({
            success:true,
            data:data
        })
    }catch(err){
        return res.send({
            "success":false
        })
    }
})

adminRouter.post('/getDetails',async (req,res) => {
    const {BusNumber} = req.body;
    try {
        const data = await Route.findOne({
            _id:BusNumber
        })
        return res.send({
            success:true,
            data:data
        })
    }catch(err){
        return res.send({
            "success":false
        })
    }
})

adminRouter.post('/bookingDetails',async(req,res) => {
    const {BusNumber,seatNumber} = req.body;
    try{
        const data = await Booking.findOne({
            BusNumber:BusNumber,
            seatNumber:seatNumber
        })
        console.log(seatNumber)
        return res.send({
            success:true,
            data:data
        })

    }catch{
        return res.send({
            "success":false
        })
    }
})

adminRouter.post('/cancelBooking',async (req,res) => {
    const {bookingid,busNumber,seatNumber} = req.body;
    console.log(req.body)
    try{
        const removeBooking = await Booking.deleteOne({
            "_id":bookingid
        })
        const updatedRoute = await Route.updateOne({
            _id:busNumber
        },{
            $pull:{
                Booked:seatNumber
            }
        })
        return res.send({
            "success":true
        })
    }catch{
        return res.send({
            "success":false
        })
    }
})

export default adminRouter;