/* Library import */
import {useState,useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

/* Dependency import */
import './css/AdminSidebar.css';

/* Component import */

/* Asset imports */

function AdminSidebar(){

    return(
        <div className='AdminSidebar'>
            <div className='heading'>
                ADMIN PANEL
            </div>
            <Sidebar width='100%'>
                <Menu>
                    <MenuItem routerLink={<Link to="/addRoute" />}> Add Route </MenuItem>
                    <MenuItem routerLink={<Link to="/managebookings" />}> Manage Bookings </MenuItem>
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

export default AdminSidebar;