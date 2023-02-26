import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/button';
import Form from 'react-bootstrap/Form';
import NavBar from '../../components/sideBars/navbar';
import { validatePassword, validateConfirmPassword } from '../../helpers/validators';
import { handleChangePassword } from '../../services/profileService';
const Password=()=>{
    const [isLoading ,setIsloading]=useState(false);
    
    const [validated, setValidated]=useState(false);
    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [confirmNewPassword, setConfirmNewPassword]=useState('');
    const [isReadOnly, setIsReadOnly]=useState(true);
   
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
       
        event.preventDefault();
        if (form.checkValidity() === false || !validatePassword(oldPassword) || !validatePassword(newPassword) ||!validateConfirmPassword(newPassword, confirmNewPassword)) {
          event.stopPropagation();
          setValidated(false);
        }
        else{
            setValidated(true);
            console.log(newPassword)
            await handleChangePassword(setIsloading, setIsReadOnly,{old_password:oldPassword.trim(), new_password:newPassword.trim()});
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }  
    };
   
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
                        <Button 
                        disabled={isLoading} 
                        label='Save Changes'
                        type='submit' 
                        handleClick={null}
                        styles={`bg-secondary-color ${isLoading?'opacity-50 cursor-not-allowed ':''} `}
                        />
                    }
                        
                            
                        
                        <Form.Group  md="3" controlId="validationCustom01" className='w-3/5'  >
                            <Form.Label className='text-lg text-secondary-color'>
                                Old password
                            </Form.Label>
                            <Form.Control required 
                            type="password" 
                            value={oldPassword}
                            readOnly={isReadOnly}
                            isInvalid={!isReadOnly && oldPassword.length<8}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                               Password must contain atleast 8 characters
                            </Form.Control.Feedback>
                    
                        </Form.Group>

                        <Form.Group  md="3" controlId="validationCustom01" className='w-3/5'  >
                            <Form.Label className='text-lg text-secondary-color'>
                                New Password
                            </Form.Label>
                            <Form.Control required 
                            type="password" 
                            value={newPassword}
                            readOnly={isReadOnly}
                            isInvalid={!isReadOnly && newPassword.length<8}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                               Password must contain atleast 8 characters
                            </Form.Control.Feedback>
                    
                        </Form.Group>
                        <Form.Group  md="3" controlId="validationCustom01" className='w-3/5'  >
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