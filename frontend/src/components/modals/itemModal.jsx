import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from '../buttons/button';

const AddItemModal=({show, closeModal, isSaving =false, serialNumbers, setSerialNumbers})=> {
    const [page,setPage]=useState(1);
    const [number, setNumber]=useState(null);

    const [validated, setValidated] = useState(false);
    const ref=useRef();

    const handleSave=(e)=>{
        e.preventDefault();  
   
    }
    const hanldeChange=(e,ind)=>{
        const arr= serialNumbers.map((number, i)=>i==ind?e.target.value:number)
        setSerialNumbers(arr)
    }

    const handleClose=()=>{
        setPage(1);
        setNumber(0);
        closeModal();
    }
    return (
        <>
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
            <Modal.Title>Add New Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='flex flex-col' validated={validated} ref={ref} >
                    
                {page==1?
                <Form.Group className="mb-3" >
                <Form.Label>Enter the Number of Items</Form.Label>
                <Form.Control
                    type="number"
                    value={number}
                    onChange={(e)=> {setNumber(e.target.value); setSerialNumbers(Array(parseInt(e.target.value)).fill('0'))}}
                    autoFocus
                />
                </Form.Group>:
                <Form.Group className="mb-3" >
                  { serialNumbers?.map((serialNumber,ind)=>
                    <Form.Group className="mb-3" >
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        value={serialNumbers[parseInt(ind)]}
                        onChange={(e)=>hanldeChange(e,parseInt(ind))}
                        isInvalid={serialNumbers[parseInt(ind)].length<10}
                    />
                    </Form.Group >
                  )
                    
                }
                </Form.Group>
                    
                }
                    
        
                </Form>
            </Modal.Body>
            <Modal.Footer>
            {page==1?<Button handleClick={()=>setPage(2)} label='Next' styles='bg-secondary-color' />:
            <>
                <Button handleClick={handleClose} disabled={isSaving} label='Cancel' styles='bg-gray-400' />
            
                <Button 
                disabled={isSaving}  
                handleClick={handleSave} 
                label='Save Changes' 
                styles={`bg-secondary-color ${(isSaving)?'opacity-50':''} `}/>
            </>}
           
            
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddItemModal