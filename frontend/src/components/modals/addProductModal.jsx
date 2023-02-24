import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from '../buttons/button';
import { ImagePicker } from '../imagePicker/imagePicker';
const AddProductModal=({show, setShow, type, setType, description, setDescription, base64Image, setBase64Image, handleSave })=> {
  

    const handleClose = () => setShow(false);
    console.log(base64Image)
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className='flex gap-x-3 w-full'>
                <ImagePicker imageUrl={base64Image} handleImageChange={(newDataUri)=>{
                setBase64Image(newDataUri)}} />
                <div className='flex flex-col flex-1'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product type"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
            
                    <Form.Group className="mb-3 ">
                        <Form.Label>Product description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </Form.Group>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button handleClick={handleClose} label='Cancel' styles='bg-gray-400' />
           
          <Button disabled={type=='' || description==''}  handleClick={handleSave} label='Save Changes' styles={`bg-secondary-color ${(type=='' || description=='')?'opacity-50':''} `}/>
           
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductModal