/* Library import */
import { useState, useEffect } from 'react';
import axios from '../axios.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

/* Dependency import */
import './css/Booking.css';

/* Component import */
import Sidebar from './Sidebar.js';
import FortySeater from './Bus/FortySeater'
import { Box, useStepContext } from '@mui/material';

/* Asset imports */

function Booking() {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [userData, setuserData] = useState({});
    const [Buses, setBuses] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState();
    const [filteredBuses, setfilteredBuses] = useState([]);
    const [selectedBus, setselectedBus] = useState();
    const [to, setTo] = useState();
    const [from, setFrom] = useState();

    useEffect(() => {
        const getAllBuses = async () => {
            await axios.get('/allBuses').then((response) => {
                if (!response.data.success) {
                    alert("some error occured! please reload")
                }
                setBuses(response.data.data)
            }).catch((error) => {
                alert("some error occured! please reload");
            })
        }
        getAllBuses();
    }, [])

    useEffect(() => {
        console.log(Buses)
    }, [Buses])

    useEffect(() => {
        console.log("called");
        setfilteredBuses([]);
        Buses.forEach((bus)=>{
            if(filterBuses(bus)){
                console.table(bus);
                setfilteredBuses(filteredBuses=>[...filteredBuses,bus]);
            }
        })
    }, [Buses,to,from])
    

    const filterBuses = (bus) => {
        if (to === "" || from === "") return false;
        let indexTo = bus.Stops.indexOf(to);
        let indexFrom = bus.Stops.indexOf(from);
        if (indexTo === -1 || indexFrom === -1) return false;
        if (indexTo > indexFrom) return true;
        return false;
    }

    const BookBus = async () => {
        await axios.post('/book',{
            "BusNumber":selectedBus._id,
            "seatNumber":selectedSeat,
            "user":userData._id
        }).then((response)=>{
            if(response.data.success){
                alert(`Booking Success with booking id: ${response.data.bookingid}`)
            }else{
                alert("There was some error! please reload");
            }
        }).catch((err)=>{
            alert("There was some error! please reload");
        })
    }


    useEffect(() => {
        const getUserData = async () => {
            await axios.get('/getUserData', {
                headers: {
                    'token': token,
                }
            }).then((response) => {
                if (!response.data.success) {
                    Cookies.remove('token');
                    navigate('/');
                }
                setuserData(response.data)
                if (response.data.admin) {
                    navigate('/adminPanel')
                }
            }).catch((error) => {
                Cookies.remove('token');
                navigate('/');
            })
        }
        getUserData();
    }, [token])


    return (
        <div className='Booking'>
            <Sidebar
                username={userData.username}
            />
            <div className="BookingArea">
                <div className='formContainer'>
                    <Box sx={{ width: '80%' }}>
                        <TextField label="From" variant="standard" onChange={(e)=>{
                            setFrom(e.target.value)
                        }}/>
                        <br/><br/>
                        <TextField label="To" variant="standard" onChange={(e) => {
                            setTo(e.target.value)
                        }}/>
                    </Box>
                    <br />
                    <h2>Best buses</h2>
                    <Box sx={{ width: '80%', height: '70%' }}>
                        <List>
                            {
                                filteredBuses.map((bus,index) => (
                                    <ListItem secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            ₹{bus.Price}
                                        </IconButton>
                                    }
                                    onClick={()=>{
                                        setSelectedSeat(null)
                                        setselectedBus(bus)
                                    }}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={bus._id} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Button 
                        variant="outlined"
                        onClick={async() =>{
                            await BookBus();
                        }}
                    >
                        Book
                    </Button>

                </div>
                <div className='busContainer'>
                    {
                        (selectedBus)?(
                            <FortySeater
                                rows={selectedBus.RowsNum}
                                rightCol={selectedBus.RightCol}
                                leftCol={selectedBus.LeftCol}
                                bookedSeats={selectedBus.Booked}
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setSelectedSeat}
                            />
                        ):("")
                    }
                </div>
            </div>
        </div>
    );
}

export default Booking;