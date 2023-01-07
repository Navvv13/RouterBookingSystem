/* Library import */
import {useState,useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

/* Dependency import */
import './css/Sidebar.css';

/* Component import */

/* Asset imports */

function SidebarNormal({
    username
}){

    return(
        <div className='Sidebar'>
            <div className='heading'>
                ROUTER
            </div>
            Hello {username}
            <br/><br/>
            <Sidebar width='100%'>
                <Menu>
                    <MenuItem routerLink={<Link to="/booking" />}> Home </MenuItem>
                    <MenuItem routerLink={<Link to="/mybookings" />}> My Bookings </MenuItem>
                </Menu>
            </Sidebar>
            <div className='logout-section'>
                <div className="logoutButton">
                    LOGOUT
                </div>
            </div>
        </div>
    );
}

export default SidebarNormal;