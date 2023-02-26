import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';
import {ImExit} from 'react-icons/im'
const ProfileNav =()=> {
    return (
        <nav className='flex flex-col bg-primary-color '>
            <NavLink className='py-2 px-3  no-underline  my-2 nav-link nav-link2 ' to="/profile" >
                <div  className='flex items-center gap-x-3'>
                    <FaUserCircle className='w-6 h-6 ' />
                    <span className='hidden sm:block'>My Account</span>
                </div> 
            </NavLink>
            <NavLink className='py-2 px-3  no-underline  my-2 nav-link nav-link2 ' to="/password" >
                <div  className='flex items-center gap-x-3'>
                    <BiEdit className='w-6 h-6 '  />
                    <span className='hidden sm:block'>Change Password</span>
                </div> 
            </NavLink>
            <NavLink className='py-2 px-3 no-underline mt-2 nav-link nav-link2 ' to="/" onClick={()=>localStorage.clear()} >
                <div  className='flex items-center gap-x-3'>
                    <ImExit className='w-6 h-6 '  />
                    <span className='hidden sm:block'>Exit</span>
                </div> 
            </NavLink>
        </nav>
    );
}
export default ProfileNav