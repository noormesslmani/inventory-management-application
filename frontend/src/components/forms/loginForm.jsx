import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../buttons/button';
import { validatePassword } from '../../helpers/validators';
import Spinner from 'react-bootstrap/Spinner';
const LogInForm=({setFormType, email, password, setEmail, setPassword, handleLogin, isLoading})=> {
  const [validated, setValidated] = useState(false);
 
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false || !validatePassword(password)) {
      event.stopPropagation();
    }
    else{
      await handleLogin();
    }
   
    setTimeout(() => {
        setValidated(false);
    }, "2000")
    
  };

  console.log(isLoading)

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-white w-96 rounded-lg drop-shadow-xl h-auto py-7 gap-y-3 flex flex-col items-center' >
        <p className='text-secondary-color text-3xl font-semibold'>Login</p>
    
        <Form.Group  md="3" controlId="validationCustom01" className='w-10/12' >
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
                >
                <Form.Control required type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
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
                onChange={(e)=> setPassword(e.target.value)}
                isInvalid={password?.length<8}
                />
                <Form.Control.Feedback type="invalid">
                    Password must be atleast 8 characters long
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    
        <p className='text-dark-grey text-sm' >Don't have an account yet? 
          <span 
          className='text-sm text-secondary-color cursor-pointer hover:underline' 
          onClick={()=>setFormType('registerfirst')}>
            Create Account
          </span> 
        </p>
        {isLoading && <Spinner animation="border" variant="warning" className='justify-self-center self-center' />}
        <Button label='Login' type='submit' styles='mt-2 bg-secondary-color'/>
    </Form>
  );
}

export default LogInForm;