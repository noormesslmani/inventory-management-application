import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../buttons/button';

const RegisterFormSecond=({setFormType, email, password, confirmPassword, setEmail, setPassword, setConfirmPassword, handleRegister})=> {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
        const form = event.currentTarget;
        setValidated(true);
        event.preventDefault();
        if (form.checkValidity() === false) {
        event.stopPropagation();
        setTimeout(() => {
            setValidated(false);
        }, "2000")
        }
        else{
            console.log('hi')
            await handleRegister();
        }
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
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
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
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                isInvalid={password?.length<8}
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
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}  
                isInvalid={confirmPassword!=password}
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
        <div className='flex gap-x-2'>
            <Button label='Back' type='' 
            styles='m-2 bg-gray-400' 
            handleClick={handleBack}
            />
            <Button label='Register' type='submit' styles='m-2 bg-secondary-color'  />
        </div>
       
    </Form>
  );
}

export default RegisterFormSecond;