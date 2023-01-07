/* Library import */
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from '../axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

/* Dependency import */
import './css/AddRoute.css';

/* Component import */
import AdminSidebar from './AdminSidebar';
import FortySeater from './Bus/FortySeater';

/* Asset imports */

function AddRoute(){

    const [busRows, setbusRows] = useState(5);
    const [leftCol, setleftCol] = useState(1);
    const [rightCol, setrightCol] = useState(1);
    const [stops,setStops] = useState([]);
    const [inputBox, setinputBox] = useState("");
    const [amount, setAmount] = useState(0);
    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [userData, setuserData] = useState({});

    useEffect(() => {
      if(!amount){
        setAmount(0);
      }
    }, [amount])
    
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


    const submitRoute = async () => {
        setLoading(true);
        await axios.post('/addRoute',{
            "RowsNum": busRows,
            "LeftCol": leftCol,
            "RightCol": rightCol,
            "Stops": stops,
            "Price": amount
        }).then((response) => {
            console.log(response);
            if(response.data.success){
                alert(`Bus route created successfully with bus id: ${response.data.BusNumber}`);
            }else{
                alert(`Some error occured!`);
            }
        })
        setLoading(false);
    }

    return(
        <div className='AddRoute'>
            <AdminSidebar/>
            <div className="addrouteArea">
                <div className="formContainer">
                    <Box sx={{ width: "50%" }}>
                        <Typography id="track-false-slider" gutterBottom>
                            Number of rows in Bus
                        </Typography>
                        <Slider
                            defaultValue={5}
                            getAriaValueText={setbusRows}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={5}
                            max={10}
                        />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography id="track-false-slider" gutterBottom>
                            Number of Columns in left side of Bus
                        </Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={setleftCol}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={4}
                        />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography id="track-false-slider" gutterBottom>
                            Number of Columns in right side of Bus
                        </Typography>
                        <Slider
                            defaultValue={1}
                            getAriaValueText={setrightCol}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={4}
                        />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography id="track-false-slider" gutterBottom>
                            Total number of seats: <b>{(leftCol+rightCol)*busRows}</b>
                        </Typography>
                    </Box>
                    <br/>
                    <Box sx={{ width: '50%' }}>
                        <Stepper activeStep={stops.length} orientation="vertical">
                        {stops.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                    <Box sx={{ width: '50%',minWidth:"360px",justifyContent:'space-evenly' }}>
                        <TextField  
                            label="Add Stop" 
                            variant="standard"
                            onChange={(e)=>{
                                setinputBox(e.target.value);
                            }}
                            value={inputBox} 
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Fab 
                            color="primary" 
                            aria-label="add"
                            onClick={()=>{
                                if(inputBox!=="" && stops.length < 7){
                                    setStops([...stops,inputBox]);
                                    setinputBox("");
                                }
                                if(stops.length>6){
                                    alert("you can add maximum 7 stops")
                                }
                            }}
                        >
                            <AddIcon />
                        </Fab>
                        &nbsp;&nbsp;&nbsp;
                        <Fab 
                            color="secondary" 
                            aria-label="add"
                            onClick={()=>{
                                if(stops.length > 0){
                                    setStops(stops.slice(0,-1));
                                }
                            }}
                        >
                            <RemoveIcon/>
                        </Fab>
                        <br/><br/>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Ticket Cost</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-amount"
                              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                              label="Ticket Cost"
                              value={amount}
                              onChange={(e)=>{
                                setAmount(parseInt(e.target.value))
                              }}
                            />
                        </FormControl>
                        <br/><br/>
                        <Button 
                            variant="contained"
                            onClick={async ()=>{
                                await submitRoute();
                            }}
                        >
                            Add Route
                        </Button>
                        <br/>
                        {
                            (loading)?<CircularProgress/>:''
                        }
                    </Box>
                </div>
                <div className='busContainer'>
                    <FortySeater
                        rows={busRows}
                        rightCol = {rightCol}
                        leftCol = {leftCol}
                        bookedSeats = {[]}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddRoute;

// const rows = 9;
//     const rightCol = 3;
//     const leftCol = 2;
    
//     const bookedSeats = [0,2,5,7,8,9]; 
//     const selectedSeat = 10;