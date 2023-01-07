/* Library import */
import {useState,useEffect} from 'react';
import axios from '../axios.js';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import AdminSidebar from './AdminSidebar.js';


/* Dependency import */
import './css/AdminPanel.css';

/* Component import */

/* Asset imports */

function AdminPanel(){

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [userData, setuserData] = useState({});

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
    

    return(
        <div className='AdminPanel'>
           <AdminSidebar/>
        </div>
    );
}

export default AdminPanel;