import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo/logo';
import LogInForm from '../../components/forms/loginForm';
import RegisterFormFirst from '../../components/forms/registerFormFirst';
import RegisterFormSecond from '../../components/forms/registerFormSecond';
import { createAccount, login } from '../../api/auth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Landing=()=>{
    const navigate= useNavigate();
    const [formType, setFormType]= useState('login');
    const [loginEmail, setLoginEmail]=useState(null);
    const [loginPassword, setLoginPassword]=useState(null);
    const [firstName, setFirstName]=useState(null);
    const [lastName, setLastName]=useState(null);
    const [registerEmail, setRegisterEmail]=useState(null);
    const [registerPassword, setRegisterPassword]=useState(null);
    const [confirmPassword, setConfirmPassword]=useState(null);
    const [isLoading ,setIsLoading]=useState(false);
    const handleLogin=async()=>{
      setIsLoading(true);
      try{
        const res=await login({email:loginEmail, password: loginPassword});
        console.log(res)
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.authorisation.token);
        navigate('/products');
      }
      catch (error){
    
        toast.error(error.response.data.message);
      }
      finally{
        setIsLoading(false);
      }
    }

    const handleRegister=async()=>{
      setIsLoading(true)
        try{
          const res =await createAccount({
            email:registerEmail, 
            password: registerPassword, 
            first_name:firstName, 
            last_name:lastName});
            toast.success('Account successfully created!');;
        }
        catch (error){
          toast.error(error.response.data.message);
        }
        finally{
          setIsLoading(false);
        }
      }
    
    return(
        <div className='w-screen min-h-screen bg-primary-color flex flex-col py-3 box-border items-center'>
            <Logo/>
            {
            formType=='login'?
            <LogInForm 
            setFormType={setFormType} 
            email={loginEmail} 
            password={loginPassword}
            setEmail={setLoginEmail}
            setPassword={setLoginPassword}
            handleLogin={handleLogin}
            isLoading={isLoading}
            />: 
            formType=='registerfirst'?
            <RegisterFormFirst 
            setFormType={setFormType} 
            firstName={firstName} 
            lastName={lastName} 
            setFirstName={setFirstName}
            setLastName={setLastName}
            />:
            <RegisterFormSecond 
            setFormType={setFormType} 
            email={registerEmail} 
            password={registerPassword} 
            confirmPassword={confirmPassword} 
            setEmail={setRegisterEmail}
            setPassword={setRegisterPassword}
            setConfirmPassword={setConfirmPassword}
            handleRegister={handleRegister}
            isLoading={isLoading}
            />
            }
            
        </div>
    )
}

export default Landing;