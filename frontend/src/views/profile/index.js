import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/button';
import Form from 'react-bootstrap/Form';
import NavBar from '../../components/sideBars/navbar';
import { validateName } from '../../helpers/validators';
import { handleSaveChanges } from '../../services/profileService';
import ImagePicker from '../../components/imagePicker/profileImagePicker';
import Spinner from 'react-bootstrap/Spinner';
const Profile=()=>{

    const [isReadOnly, setIsReadOnly]=useState(true);
    const [validated, setValidated]=useState(false);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const [isLoading, setIsloading]=useState(false);
  
    const [base64, setBase64]=useState(null);
   

    const handleEditProfile=(e)=>{
        e.preventDefault();
        setIsReadOnly(false);
    }
    const handleCancel=(e)=>{
        e.preventDefault();
        setIsReadOnly(true);
    }

    //submit form
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
       
        event.preventDefault();
        if (
            form.checkValidity() === false || 
            !validateName(user.first_name) || 
            !validateName(user.last_name)) {
            event.stopPropagation();
            setValidated(false);
        }
        else{
            setValidated(true);
            handleSaveChanges(setIsloading, user,base64,setUser, setIsReadOnly);
        }  
    };
    
    return(
        <div className='w-screen min-h-screen flex box-border'>
            <NavBar />
            <div className='flex flex-col flex-1 p-5 gap-y-3 h-full'>
                <p className='text-3xl font-semibold text-secondary-color'>Personal Details</p>
                <div className='border-y-2 w-full border-primary-color' />

                <div className='flex w-full flex-wrap'>
                    {
                    isReadOnly?
                    <img 
                    src={`http://localhost:8000/images/${user?.profile_picture}`} 
                    alt="default" 
                    className="h-64 w-56 object-contain" />:
                    <ImagePicker setBase64={setBase64} user={user} />
                    }
                

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className='flex flex-col items-center flex-1 gap-y-3' >
                        {isReadOnly?
                            <Button label='EditProfile' handleClick={handleEditProfile} styles='mt-3 bg-secondary-color self-end '/>:
                            <div className='flex gap-x-2 self-end'>
                                {isLoading && 
                                <Spinner 
                                animation="border" 
                                variant="warning" 
                                className='justify-self-center self-center' />}   
                                <Button 
                                disabled={isLoading} 
                                label='Cancel' 
                                handleClick={handleCancel} 
                                styles='mt-3  
                                bg-gray-300'/>
                                <Button 
                                disabled={isLoading} 
                                label='Save Changes' 
                                type='submit' 
                                handleClick={null} 
                                styles={`mt-3 bg-secondary-color ${isLoading?'opacity-50 cursor-not-allowed ':''} `}
                                />:
                            </div>
                        }
                        <Form.Group  md="3" controlId="validationCustom01" className='w-full sm:w-3/5'  >
                            <Form.Label className='text-lg text-secondary-color'>
                                First Name
                            </Form.Label>
                            <Form.Control required 
                            type="text" 
                            value={user?.first_name}
                            readOnly={isReadOnly}
                            isInvalid={user.first_name?.length<2}
                            onChange={(e)=>setUser({...user,first_name: e.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid first name
                            </Form.Control.Feedback>
                    
                        </Form.Group>

                        <Form.Group  md="3" controlId="validationCustom01" className='w-full sm:w-3/5'  >
                            <Form.Label className='text-lg text-secondary-color'>
                                Last Name
                            </Form.Label>
                            <Form.Control 
                            required type="text" 
                            value={user?.last_name}
                            readOnly={isReadOnly}
                            isInvalid={user.last_name?.length<2}
                            onChange={(e)=>setUser({...user,last_name: e.target.value})}
                            
                            />
                            <Form.Control.Feedback type="invalid">
                            Please enter a valid last name
                            </Form.Control.Feedback>
                    
                        </Form.Group>
                       
                    </Form>
                </div>
                
            </div>

            
        </div>
    )
    
}

export default Profile;