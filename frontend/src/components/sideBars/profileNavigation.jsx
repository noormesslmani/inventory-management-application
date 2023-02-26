import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';
import {ImExit} from 'react-icons/im'
const ProfileNav =()=> {
    return (
        <nav className='flex flex-col bg-primary-color '>
            <NavLink className='py-2 px-3  no-underline  my-2 nav-link nav-link2 ' to="/profile" >
                <div  className='flex items-center gap-x-3'>
                    <FaUserCircle size={20} />
                    My Account
                </div> 
            </NavLink>
            <NavLink className='py-2 px-3  no-underline  my-2 nav-link nav-link2 ' to="/" >
                <div  className='flex items-center gap-x-3'>
                    <BiEdit size={20} />
                    Change Password
                </div> 
            </NavLink>
            <NavLink className='py-2 px-3 no-underline mt-2 nav-link nav-link2 ' to="/" onClick={()=>localStorage.clear()} >
                <div  className='flex items-center gap-x-3'>
                    <ImExit size={20} />
                    Exit
                </div> 
            </NavLink>
        </nav>
    );
}
export default ProfileNav