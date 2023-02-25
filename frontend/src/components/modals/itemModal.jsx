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
        if(number>0 && number<=10){
            setValidated(true);
            setSerialNumbers(Array(parseInt(number)).fill('0'))
            setPage(2);
        }
        
        else{
            setValidated(false)
        }
    }
    useEffect(()=>{
        setValidated(false);
    },[page])

    const handleChange=(e,ind)=>{
        const arr= serialNumbers.map((number, i)=>i==ind?e.target.value:number)
        setSerialNumbers(arr)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if(validateSerialNumber(serialNumbers)){
            setValidated(true);
            await saveChanges();
            setNumber(null);
            setPage(1);      
        }
        else{
            setValidated(false)
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
    
                    <Form.Group  md="3" controlId="validationCustom01" className='w-10/12' >
                    
                            <Form.Control required 
                            type="number" 
                            placeholder="example: 5" 
                            value={number} 
                            onChange={(e)=> setNumber(e.target.value)}
                            isInvalid={number>10 || number<=0}
                            />
                            <Form.Control.Feedback type="invalid">
                            Number must be between 1 and 10
                            </Form.Control.Feedback>
                    
                    </Form.Group>
            
                    <Button label='Next' type='submit' styles='mt-2 bg-secondary-color'/>
                </Form>
                :
                <Form  validated={validated} onSubmit={handleSubmit} className='flex flex-col items-center' >
    
                { serialNumbers?.map((serialNumber,ind)=>
                    <Form.Group className="mb-3" >
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
        
                    <div className='flex w-full justify-center gap-x-3'>
                        <Button handleClick={handleClose} disabled={isSaving} label='Cancel' styles='bg-gray-400' />
                        
                        <Button 
                        disabled={isSaving}  
                        handleClick={handleSave} 
                        label='Save Changes' 
                        styles={`bg-secondary-color ${(isSaving)?'opacity-50':''} `}/>
                    </div>
                    
                </Form>
                
            }
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddItemModal