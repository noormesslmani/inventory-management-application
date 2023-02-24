import React, { useState } from 'react';
import Button from '../buttons/button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal=({show, setShow, productId, deleteProduct})=> {

  const handleClose = () => setShow(false);
  return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-secondary-color'>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? 
        </Modal.Body>
        <Modal.Footer>
            <Button handleClick={handleClose} label='No' styles='bg-gray-400' />
           
           <Button  handleClick={()=>deleteProduct(productId)} label='Save Changes' styles='bg-secondary-color'/>
        </Modal.Footer>
      </Modal>
    
  );
}

export default DeleteModal;