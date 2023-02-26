import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from '../buttons/button';
import ImagePicker from '../imagePicker/productImagePicker';
const AddProductModal=({show, handleClose, productProps, setProductProps, handleSave, isSaving })=> {


  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className='flex flex-col' >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter product type"
                      value={productProps.type}
                      onChange={(e)=>setProductProps({...productProps, type: e.target.value})}
                      autoFocus
                  />
              </Form.Group>
      
              <Form.Group className="mb-3 ">
                  <Form.Label>Product description</Form.Label>
                  <Form.Control as="textarea" rows={3}
                   value={productProps.description}
                   onChange={(e)=>setProductProps({...productProps, description: e.target.value})}
                  />
              </Form.Group>
              <ImagePicker  setProductProps={setProductProps} productProps={productProps}  />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button handleClick={handleClose} disabled={isSaving} label='Cancel' styles='bg-gray-400' />
           
          <Button 
          disabled={productProps.type=='' || productProps.description =='' || isSaving}  
          handleClick={handleSave} 
          label='Save Changes' 
          styles={`bg-secondary-color ${(productProps.type =='' || productProps.description =='' || isSaving)?'cursor-not-allowed opacity-50':''} `}/>
           
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductModal