/* Library import */
import {useState,useEffect} from 'react';

/* Dependency import */
import './css/FortySeater.css';

/* Component import */

/* Asset imports */
import steeringWheel from '../../assets/bus/steeringwheel.png'
import seat from '../../assets/bus/seat.png'
import seatRed from '../../assets/bus/seatRed.png'
import seatGreen from '../../assets/bus/seatGreen.png'

function FortySeater({
    rows,rightCol,leftCol,bookedSeats,selectedSeat,setSelectedSeat
}){

    // const rows = 9;
    // const rightCol = 3;
    // const leftCol = 2;
    
    // const bookedSeats = [0,2,5,7,8,9]; 
    // const selectedSeat = 10;


    return(
        <div className='FortySeater'>


            {/* drivers seat  */}
            <div className='row'>
            {Array(rightCol+leftCol).fill(null).map((value, index) => (
                <div className="emptyBox"></div>
            ))}
                <div className="driverSeatPic">
                    <img 
                        src={steeringWheel} 
                        alt="" 
                        className='steeringwheel'
                    />
                </div>
            </div>
            {   
                Array(rows).fill(null).map((value, x) => (
                    
                    <div className='row'>
                        {
                            Array(leftCol).fill(null).map((value, y) => (
                                <div 
                                    className="seat"
                                    id={((rightCol+leftCol)*x)+(y)}
                                    onClick={()=>{
                                        setSelectedSeat(((rightCol+leftCol)*x)+(y));
                                    }}
                                >
                                    <img 
                                        src={
                                            (bookedSeats.includes(((rightCol+leftCol)*x)+(y))?seatRed:(selectedSeat===((rightCol+leftCol)*x)+(y))?seat:seatGreen)
                                        } 
                                        alt="" 
                                        className='steeringwheel'
                                    />
                                    {/* {((rightCol+leftCol)*x)+y} */}
                                </div>
                            ))
                        }
                        <div className="emptyBox"></div>
                        {
                            Array(rightCol).fill(null).map((value, y) => (
                                <div 
                                    className="seat"
                                    id={((rightCol+leftCol)*x)+(leftCol+y)}
                                    onClick={()=>{
                                        setSelectedSeat(((rightCol+leftCol)*x)+(leftCol+y));
                                    }}
                                >
                                    <img 
                                        src={(bookedSeats.includes(((rightCol+leftCol)*x)+(leftCol+y))?seatRed:(selectedSeat===((rightCol+leftCol)*x)+(leftCol+y))?seat:seatGreen)} 
                                        alt="" 
                                        className='steeringwheel'
                                    />
                                    {/* {((rightCol+leftCol)*x)+(leftCol+y)} */}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default FortySeater;