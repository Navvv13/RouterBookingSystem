import mongoose from "mongoose";
import express from "express";
import Cors from 'cors';
import "./config.js"
import AuthRouter from './routes/Authorization/auth.js'
import UserData from './routes/Authorization/UserData.js'
import adminRouter from "./routes/Booking/admin.js";

const app = express()

app.use(express.json());
app.use(Cors());
app.use(AuthRouter);
app.use(UserData);
app.use(adminRouter);

const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;
const DBcluster = process.env.DBcluster;


const port = process.env.PORT || 8001;

const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@${DBname}.${DBcluster}.mongodb.net/BusBooking?retryWrites=true&w=majority`;

mongoose
    .connect(connection_url)
    .then((result) => {
        console.log("Connected To Database");
        app.listen(port, () => console.log(`Listening on Localhost:${port}`))
    })
    .catch((err) => {
        console.log('\x1b[31m',"Error Connecting to Database");
    });