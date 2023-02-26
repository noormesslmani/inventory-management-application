
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../logo/logo';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfileNav from './profileNavigation';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
import {GiCardboardBox} from 'react-icons/gi';
import {FaUserAlt} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useMenu } from '../../context/menuContext';
export default ()=> {

    const { isMenuOpen, setIsMenuOpen } = useMenu();
   
   
    return (
        <nav className='flex flex-col bg-primary-color min-h-screen sm:w-60 w-16'>
            <Navbar.Brand className='mb-5'>
                <Logo size='text-3xl px-0 hidden sm:block' />
            </Navbar.Brand>
            <NavLink className=' w-full flex gap-x-1  p-2  no-underline  mb-5 nav-link' to="/products" >
                <div  className='flex items-center justfiy-center gap-x-3'>
                    <GiCardboardBox size={30} />
                    <span className='hidden sm:block'>Products</span>
                </div> 
            </NavLink>

            <Link className='w-full no-underline px-2 mb-3 text-2xl text-white hover:text-secondary-color font-bold' to='#' onClick={()=>setIsMenuOpen(!isMenuOpen)} >
              
                <div  className='flex items-center sm:gap-x-3'>
                    <FaUserAlt size={24}/>
                    <span className='hidden sm:block'>Account</span>
                    {isMenuOpen?<MdOutlineKeyboardArrowUp size={35} />:<MdOutlineKeyboardArrowDown size={35} />}
                </div> 
            
            </Link>
            {isMenuOpen?<ProfileNav/>:<></>}
       
            
        </nav>
    );
}

