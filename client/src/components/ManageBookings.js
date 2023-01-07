/* Library import */
import {useState,useEffect} from 'react';
import axios from '../axios.js';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import AdminSidebar from './AdminSidebar.js';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

/* Dependency import */
import './css/ManageBookings.css';

/* Component import */
import TextField from '@mui/material/TextField';
import FortySeater from './Bus/FortySeater.js';

/* Asset imports */

function ManageBookings(){

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [userData, setuserData] = useState({});
    const [inputData, setinputData] = useState("");
    const [busDetails,setBusDetails] = useState();
    const [selectedSeat,setselectedSeat] = useState(null);
    const [bookingStatus, setBookingStatus] = useState();

    useEffect(() => {
        const getUserData = async () => {
            await axios.get('/getUserData',{
                headers:{
                    'token':token,
                }
            }).then((response) => {
                if(!response.data.success){
                    Cookies.remove('token');
                    navigate('/');
                }
                setuserData(response.data)
                if(!response.data.admin){
                    navigate('/booking')
                }
            }).catch((error) => {
                Cookies.remove('token');
                navigate('/');
            })
        }
        getUserData();
    }, [token])

    const SearchBus = async () => {
        setselectedSeat();
        await axios.post('/getDetails',{
            "BusNumber":inputData
        }).then((response) => {
            if(response.data.success){
                setBusDetails(response.data.data);
                console.log(response.data.data)
            }else{
                alert("something went wrong please try again!");
            }
        }).catch((err) => {
            alert("something went wrong please try again!");
        })
    }

    

    useEffect(() => {
        const getBookingDetails = async () => {
            setBookingStatus();
            await axios.post('/bookingDetails',{
                BusNumber:busDetails._id,
                seatNumber:selectedSeat
            }).then((response) => {
                if(response.data.success){
                    setBookingStatus(response.data.data);
                }else{
                    alert("something went wrong please try again!");
                }
            }).catch((err)=>{
                alert("something went wrong please try again!");
            })
        }
        getBookingDetails();
    }, [,selectedSeat])
    
    const cancelBooking = async () => {
        await axios.post('/cancelBooking',{
            bookingid:bookingStatus._id,
            busNumber:busDetails._id,
            seatNumber:selectedSeat
        }).then((response) => {
            if(response.data.success){
                alert("booking deleted!");
            }else{
                alert("some error occured!")
            }
        }).catch((err)=>{
            alert("some error occured!")
        })
    }

    return(
        <div className='ManageBookings'>
           <AdminSidebar/>
           <div className="addrouteArea">
                <div className="formContainer">
                    <div className="searchBar">
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <TextField label="Bus Number" variant="standard" 
                                onChange={(e)=>{
                                    setinputData(e.target.value)
                                }}
                                value={inputData}
                            />
                            <Fab color="primary" aria-label="add"
                                onClick={async() =>{
                                    await SearchBus();
                                }}
                            >
                                <SearchIcon/>
                            </Fab>
                        </Box>
                    </div>
                    <div className="details">
                        Click on seats to get details
                        <br/><br/>
                        {
                            (bookingStatus)?(
                                <>
                                <b>Booked By:</b> {
                                    bookingStatus.user
                                }
                                <br/>
                                <br/>
                                <br/>
                                <Button variant="outlined"
                                    onClick={async()=>{
                                        await cancelBooking();
                                    }}
                                >Cancel Booking</Button>
                                </>
                            ):("SEAT UNSOLD")
                        }
                    </div>
                </div>
                <div className='busContainer'>
                    {
                        (busDetails)?(
                            <FortySeater
                                rows={busDetails.RowsNum}
                                rightCol = {busDetails.RightCol}
                                leftCol = {busDetails.LeftCol}
                                bookedSeats = {busDetails.Booked}
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setselectedSeat}
                            />
                        ):('')
                    }   
                </div>
            </div>
        </div>
    );
}

export default ManageBookings;