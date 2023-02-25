import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const ProfileNav =()=> {
    return (
        <nav className='flex flex-col bg-primary-color '>
            <NavLink className='p-2  no-underline  my-2 nav-link nav-link2 text-lg ' to="/" >
                My Account
            </NavLink>
            <NavLink className='p-2  no-underline  my-2 nav-link nav-link2 text-lg ' to="/" >
                Edit Profile
            </NavLink>
            <NavLink className='p-2  no-underline mt-2 nav-link nav-link2 text-lg ' to="/" >LogOut</NavLink>
        </nav>
    );
}
export default ProfileNav