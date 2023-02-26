
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../logo/logo';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfileNav from './profileNavigation';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
import {GiCardboardBox} from 'react-icons/gi';
import {FaUserAlt} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useMenu } from '../../context/menuContext';
export default ()=> {
    const [show, setShow]=useState(false);
    const location = useLocation();
    const { isMenuOpen, setIsMenuOpen } = useMenu();
  
    return (
        <nav className='flex flex-col bg-primary-color min-h-screen w-60'>
            <Navbar.Brand className='mb-5'>
                <Logo size='text-3xl px-0' />
            </Navbar.Brand>
            <NavLink className=' w-full flex gap-x-1  p-2  no-underline  mb-5 nav-link' to="/products" >
                <div  className='flex items-center gap-x-3'>
                    <GiCardboardBox size={30} />
                    Products
                </div> 
                
            </NavLink>

            <Link className='w-full no-underline px-2 mb-3 text-2xl text-white hover:text-secondary-color font-bold' to='#' onClick={()=>setIsMenuOpen(!isMenuOpen)} >
              
                    <div  className='flex items-center gap-x-3'>
                        <FaUserAlt/>
                        Account
                        {isMenuOpen?<MdOutlineKeyboardArrowUp size={35} />:<MdOutlineKeyboardArrowDown size={35} />}
                    </div> 
              
            </Link>
            {isMenuOpen?<ProfileNav/>:<></>}
       
            
        </nav>
    );
}

