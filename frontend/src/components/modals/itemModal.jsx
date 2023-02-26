import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../buttons/button';
import Modal from 'react-bootstrap/Modal';
import { validateSerialNumber } from '../../helpers/validators';
const AddItemModal=({show, closeModal, isSaving =false, serialNumbers, setSerialNumbers, saveChanges})=> {
    const [page,setPage]=useState(1);
    const [number, setNumber]=useState(null);

    const handleClose=()=>{
        setPage(1);
        setNumber(null);
        closeModal();
    }
    const [validated, setValidated] = useState(false);

    const handleSubmit =  (e) => {
        e.preventDefault();
       
        if(number>0 && number<=15){
            setSerialNumbers(Array(parseInt(number)).fill('0'))
            setPage(2);
        }
    
    }
   

    const handleChange=(e,ind)=>{
        const arr= serialNumbers.map((number, i)=>i==ind?e.target.value:number)
        setSerialNumbers(arr)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if(validateSerialNumber(serialNumbers)){
            await saveChanges();
            setNumber(null);
            setPage(1);      
        }
        
    };

   
    return (
        <>
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
            <Modal.Title>Add New Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {page==1?
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='flex flex-col items-center' >
    
                    <Form.Group  md="3" controlId="validationCustom01" className='w-10/12 mb-3' >
                    
                            <Form.Control required 
                            type="number" 
                            placeholder="example: 5" 
                            value={number} 
                            onChange={(e)=> setNumber(e.target.value)}
                            isInvalid={number>15 || number<=0}
                            />
                            <Form.Control.Feedback type="invalid">
                            Number must be between 1 and 15
                            </Form.Control.Feedback>
                    
                    </Form.Group>
            
                    <Button label='Next' type='submit' styles='m-3 bg-secondary-color'/>
                </Form>
                :
                <Form  validated={validated} onSubmit={handleSubmit} className='flex flex-col items-center' >
    
                { serialNumbers?.map((serialNumber,ind)=>
                    <Form.Group className='w-10/12'  >
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        placeholder='example: 322KF53KF4332'
                        value={serialNumbers[parseInt(ind)]}
                        onChange={(e)=>handleChange(e,parseInt(ind))}
                        isInvalid={serialNumbers[parseInt(ind)].length<10}
                    />
                    <Form.Control.Feedback type="invalid">
                        Invalid Serial Number
                    </Form.Control.Feedback>
                    </Form.Group >
                    )
                    
                }
        
                    <div className='flex w-full justify-center '>
                        <Button handleClick={handleClose} disabled={isSaving} label='Cancel' styles={`m-3 bg-gray-400 ${isSaving?'cursor-not-allowed':''}`} />
                        
                        <Button 
                        disabled={isSaving}  
                        handleClick={handleSave} 
                        label='Save Changes' 
                        styles={`m-3 bg-secondary-color${isSaving?'cursor-not-allowed opacity-50':''} `}/>
                    </div>
                    
                </Form>
                
            }
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddItemModal