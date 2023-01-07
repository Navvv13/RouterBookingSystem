/* Library import */
import {useState,useEffect} from 'react';
import axios from '../axios.js';
import Cookies from 'js-cookie';
import { useAsyncError, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

/* Dependency import */
import './css/MyBookings.css';

/* Component import */
import Sidebar from './Sidebar.js';

/* Asset imports */
import List from '@mui/material/List';
import { Box, useStepContext } from '@mui/material';

function MyBookings(){

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [userData, setuserData] = useState({});

    const [yourBookings, setyourBookings] = useState([]);


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


    useEffect(() => {
        const getMyBookings = async () => {
            await axios.post('/myBookings',{
                user:userData._id
            }).then((response) => {
                if(response.data.success){
                    setyourBookings(response.data.data);
                }else{  
                    alert("error please try after some time");
                }
            }).catch((err)=>{
                alert("some error occured please try after some time");
            })
        }
        getMyBookings();
    }, [userData])
    

    return(
        <div className='MyBookings'>
            <Sidebar
                username={userData.username}
            />
              <div className="BookingArea">
                <div className='formContainer'>
                   
                    <Box sx={{ width: '80%', height: '70%' }}>
                        <h2>Your Bookings</h2>
                        <List>
                            {
                                yourBookings.map((bus,index) => (
                                    <ListItem secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            {bus.seatNumber+1}
                                        </IconButton>
                                    }
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={bus._id} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    

                </div>
                <div className='busContainer'>
                   
                </div>
            </div>
        </div>
    );
}

export default MyBookings;