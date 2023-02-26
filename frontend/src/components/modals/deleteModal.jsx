import React, { useState } from 'react';
import Button from '../buttons/button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal=({show, handleClose, targetProduct, deleteProduct, isDeleting})=> {


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
            <Button disabled={isDeleting} handleClick={handleClose} label='No' styles={`bg-gray-400 ${isDeleting?'cursor-not-allowed':''}`} />
           
           <Button disabled={isDeleting}  handleClick={()=>deleteProduct(targetProduct.id)} label='Yes' styles={`bg-secondary-color ${isDeleting?'cursor-not-allowed opacity-50':''} `}/>
        </Modal.Footer>
      </Modal>
    
  );
}

export default DeleteModal;