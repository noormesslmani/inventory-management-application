
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../logo/logo';
import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
export default ()=> {
    return (
        <nav className='flex flex-col bg-primary-color min-h-screen w-60 items-center'>
            <Navbar.Brand className='mb-5'>
                <Logo size='text-3xl px-0' />
            </Navbar.Brand>
            <NavLink 
             className='w-full text-center py-2  no-underline  my-3 nav-link' to="/products" >
                Products
            </NavLink>
            <NavLink className='w-full text-center py-2  no-underline  my-3 nav-link' to="/" >
                Account
            </NavLink>
       
            <NavLink className='w-full text-center py-2  no-underline  my-16 nav-link' to="/" >LogOut</NavLink>
        </nav>
    );
}

