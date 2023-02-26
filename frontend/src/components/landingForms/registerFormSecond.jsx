import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../buttons/button';
import { validatePassword, validateConfirmPassword } from '../../helpers/validators';
import Spinner from 'react-bootstrap/Spinner';
const RegisterFormSecond=({setFormType, registerProps, setRegisterprops, handleRegister, isLoading})=> {
  const [validated, setValidated] = useState(false);


  const handleSubmit = async (event) => {
        const form = event.currentTarget;
        setValidated(true);
        event.preventDefault();
        if (form.checkValidity() === false || 
            !validatePassword(registerProps.password) || 
            !validateConfirmPassword(registerProps.password, registerProps.confirm_password) )
        {
            
            event.stopPropagation(); 
        }
        else{
            console.log('hi')
            await handleRegister();
            
        }
        setTimeout(() => {
            setValidated(false);
        }, "2000")
    };
    const handleBack=(e)=>{
        e.preventDefault();
        setFormType('registerfirst');
    }


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-white w-96 rounded-lg drop-shadow-xl h-auto py-7 gap-y-3 flex flex-col items-center' >
        <p className='text-secondary-color text-3xl font-semibold'>Create Account</p>
    
        <Form.Group  md="3" controlId="validationCustom01" className='w-10/12' >
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                >
                <Form.Control required type="email" placeholder="name@example.com" 
                 value={registerProps.email}
                 onChange={(e)=>setRegisterprops({...registerProps, email: e.target.value})}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group  md="3" controlId="validationCustom01"  className='w-10/12' >
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control 
                required type="password" 
                placeholder="Password"
                value={registerProps.password}
                onChange={(e)=>setRegisterprops({...registerProps, password: e.target.value})} 
                isInvalid={registerProps.password?.length<8}
                />
                <Form.Control.Feedback type="invalid">
                    Password must be atleast 8 characters long
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group  md="3" controlId="validationCustom01"  className='w-10/12' >
            <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                <Form.Control 
                required type="password" 
                placeholder="Password"
                value={registerProps.confirm_password}
                onChange={(e)=>setRegisterprops({...registerProps, confirm_password: e.target.value})}  
                isInvalid={registerProps.confirm_password!=registerProps.password}
                />
                <Form.Control.Feedback type="invalid">
                    Passwords do not match
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    
        
        <p className='text-dark-grey text-sm' >
            Already have an account? 
            <span className='text-sm text-secondary-color cursor-pointer hover:underline'
            onClick={()=>setFormType('login')}>
                Login
            </span> 
        </p>
        {isLoading && <Spinner animation="border" variant="warning" className='justify-self-center self-center' />}
        <div className='flex gap-x-2'>
            <Button label='Back' type='' 
            styles='m-2 bg-gray-400' 
            handleClick={handleBack}
            />
            <Button label='Register' type='submit' styles={`m-2 bg-secondary-color ${isLoading?'cursor-not-allowed opacity-50':''}`} />
        </div>
       
    </Form>
  );
}

export default RegisterFormSecond;