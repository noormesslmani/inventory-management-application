import React, { useState } from 'react';
import Logo from '../../components/logo/logo';
import LogInForm from '../../components/landingForms/loginForm';
import RegisterFormFirst from '../../components/landingForms/registerFormFirst';
import RegisterFormSecond from '../../components/landingForms/registerFormSecond';
import { useNavigate } from 'react-router-dom';
import { userLogin, registerUser } from '../../services/authService';
const Landing=()=>{
    const navigate= useNavigate();
    const [formType, setFormType]= useState('login');
    const [isLoading ,setIsLoading]=useState(false);
    const [loginProps, setLoginProps]=useState({
      email: null,
      password:null
    });

    const [registerProps, setRegisterprops]=useState({
      first_name: null,
      last_name: null,
      email:null,
      password:null,
      confirm_password:null
    });


    const resetProps=()=>{
      setRegisterprops({
        first_name: null,
        last_name: null,
        email:null,
        password:null
      });
      setLoginProps({
        email: null,
        password:null
      });
    }
    
    //login
    const handleLogin=async()=>{
      await userLogin(
        setIsLoading,
        loginProps, 
        navigate
      );
    }

    //create account
    const handleRegister=async()=>{
      await registerUser(
        setIsLoading,
        registerProps,
        setFormType
      );
      resetProps();
    }
    
    return(
        <div className='w-screen min-h-screen bg-primary-color flex flex-col py-3 box-border items-center'>
            <Logo/>
            {
            formType=='login'?
            <LogInForm 
            setFormType={setFormType} 
            loginProps={loginProps}
            setLoginProps={setLoginProps}
            handleLogin={handleLogin}
            isLoading={isLoading}
            />: 
            formType=='registerfirst'?
            <RegisterFormFirst 
            setFormType={setFormType} 
            registerProps={registerProps}
            setRegisterprops={setRegisterprops}
            />:
            <RegisterFormSecond 
            setFormType={setFormType} 
            registerProps={registerProps}
            setRegisterprops={setRegisterprops}
            handleRegister={handleRegister}
            isLoading={isLoading}
            />
            }
            
        </div>
    )
}

export default Landing;