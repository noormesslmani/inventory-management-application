
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../logo/logo';
import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfileNav from './profileNavigation';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
export default ()=> {
    const [show, setShow]=useState(false)
    return (
        <nav className='flex flex-col bg-primary-color min-h-screen w-60'>
            <Navbar.Brand className='mb-5'>
                <Logo size='text-3xl px-0' />
            </Navbar.Brand>
            <NavLink 
             className=' w-full  p-2  no-underline  mb-5 nav-link' to="/products" >
                Products
            </NavLink>

            <Link className='w-full no-underline px-2 text-2xl text-white hover:text-secondary-color font-bold' to='#' onClick={()=>setShow(!show)} >
              
                    <div  className='flex items-end gap-x-1'>
                        Profile
                        {show?<MdOutlineKeyboardArrowUp/>:<MdOutlineKeyboardArrowDown />}
                    </div> 
              
            </Link>
            {show?<ProfileNav/>:<></>}
       
            
        </nav>
    );
}

