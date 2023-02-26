import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/button';
import Form from 'react-bootstrap/Form';
import NavBar from '../../components/sideBars/navbar';
import { validatePassword, validateConfirmPassword } from '../../helpers/validators';
import { handleChangePassword } from '../../services/profileService';
import Spinner from 'react-bootstrap/Spinner';
const Password=()=>{
    const [isLoading ,setIsloading]=useState(false);
    
    const [validated, setValidated]=useState(false);
    const [oldPassword, setOldPassword]=useState(null);
    const [newPassword, setNewPassword]=useState(null);
    const [confirmNewPassword, setConfirmNewPassword]=useState(null);
    const [isReadOnly, setIsReadOnly]=useState(true);
   
    const resetProps=()=>{
        setOldPassword(null);
        setNewPassword(null);
        setConfirmNewPassword(null);
    }
    //submitting reset password form
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
       
        event.preventDefault();
        if (form.checkValidity() === false || !validatePassword(oldPassword) || !validatePassword(newPassword) ||!validateConfirmPassword(newPassword, confirmNewPassword)) {
          event.stopPropagation();
          setValidated(false);
        }
        else{
            setValidated(true);
            await handleChangePassword(
                setIsloading, 
                setIsReadOnly,
                {old_password:oldPassword.trim(), new_password:newPassword.trim()});
            
        } 
        resetProps(); 
    };

    //cancel changes
    const handleCancel=()=>{
        setIsReadOnly(true);
        resetProps();
    }
   
    return(
        <div className='w-screen min-h-screen flex box-border'>
            <NavBar />
            <div className='flex flex-col flex-1 p-5 gap-y-3 h-full'>
                <p className='text-3xl font-semibold text-secondary-color'>Change Password</p>
                <div className='border-y-2 w-full border-primary-color self-center' />

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='flex flex-col items-center flex-1 gap-y-3' >
        
                        {isReadOnly?
                        <Button 
                        disabled={isLoading} 
                        label='Change Password' 
                        handleClick={()=>setIsReadOnly(false)} 
                        styles={`bg-secondary-color ${isLoading?'opacity-50 cursor-not-allowed ':''} `}
                        />:
                        <div className='flex gap-x-3'>
                            <Button 
                            disabled={isLoading} 
                            label='Cancel' 
                            handleClick={handleCancel} 
                            styles={`bg-gray-300 ${isLoading?'opacity-50 cursor-not-allowed ':''} `}
                            />
                            <Button 
                            disabled={isLoading} 
                            label='Save Changes'
                            type='submit' 
                            handleClick={null}
                            styles={`bg-secondary-color ${isLoading?'opacity-50 cursor-not-allowed ':''} `}
                            />
                        </div>
                    }
                        
                        {isLoading && <Spinner animation="border" variant="warning" className='justify-self-center self-center' />}   
                        
                        <Form.Group  md="3" controlId="validationCustom01" className='w-full sm:w-3/5' >
                            <Form.Label className='text-lg text-secondary-color'>
                                Old password
                            </Form.Label>
                            <Form.Control required 
                            type="password" 
                            value={oldPassword}
                            readOnly={isReadOnly}
                            isInvalid={!isReadOnly && oldPassword?.length<8}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                               Password must contain atleast 8 characters
                            </Form.Control.Feedback>
                    
                        </Form.Group>

                        <Form.Group  md="3" controlId="validationCustom01" className='w-full sm:w-3/5'  >
                            <Form.Label className='text-lg text-secondary-color'>
                                New Password
                            </Form.Label>
                            <Form.Control required 
                            type="password" 
                            value={newPassword}
                            readOnly={isReadOnly}
                            isInvalid={!isReadOnly && newPassword?.length<8}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                               Password must contain atleast 8 characters
                            </Form.Control.Feedback>
                    
                        </Form.Group>
                        <Form.Group  md="3" controlId="validationCustom01" className='w-full sm:w-3/5' >
                            <Form.Label className='text-lg text-secondary-color'>
                                Confirm Password
                            </Form.Label>
                            <Form.Control required 
                            type="password" 
                            value={confirmNewPassword}
                            readOnly={isReadOnly}
                            isInvalid={!isReadOnly && confirmNewPassword!=newPassword}
                            onChange={(e)=>setConfirmNewPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                               Passwords do not match
                            </Form.Control.Feedback>
                    
                        </Form.Group>
                       
                    </Form>
                </div>
                
        

            
        </div>
    )
    
}

export default Password;