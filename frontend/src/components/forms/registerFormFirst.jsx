import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from '../buttons/button';

const RegisterFormFirst=({setFormType, firstName, lastName, setFirstName, setLastName})=> {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => {
        setValidated(false);
        }, "2000");
    
    }
    else{
        setFormType('rregisterfirst');
    }

    
  
  };



  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-white w-96 rounded-lg drop-shadow-xl h-auto py-7 gap-y-3 flex flex-col items-center' >
        <p className='text-secondary-color text-3xl font-semibold'>Create Account</p>
    
        <Form.Group  md="3" controlId="validationCustom01" className='w-10/12' >
            <FloatingLabel
                controlId="floatingFirstName"
                label="First Name"
                className="mb-3"
                >
                <Form.Control 
                required type="text" 
                placeholder="John"  
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid first name.
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group  md="3" controlId="validationCustom01"  className='w-10/12' >
            <FloatingLabel controlId="floatingLastName" label="Last Name">
                <Form.Control 
                required type="text" 
                placeholder="Smith" 
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    please enter a valid last name.
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    
        <p className='text-dark-grey text-sm' >Already have an account? 
            <span className='text-sm text-secondary-color cursor-pointer hover:underline' 
            onClick={()=>setFormType('login')} >
            Login
            </span> 
        </p>
        <Button label='Next' type='submit' styles='mt-2 bg-secondary-color'  />
    </Form>
  );
}

export default RegisterFormFirst;