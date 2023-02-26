import React from 'react';

const ProductDetails=({product})=>{
    return(
        <div className='sm:w-96 flex-1 sm:flex-none box-border bg-primary-color min-h-full flex flex-col items-center py-3 gap-y-5 rounded-lg '>
            <p className='font-bold text-secondary-color text-3xl'>{product.type}</p>
            <img alt='Product-image' 
            src={`http://localhost:8000/images/${product.image}`} 
            className='w-72 h-72 rounded-lg' 
            />
            <div className='flex flex-col w-80'>
                <p className='font-medium text-secondary-color text-xl'>Description</p>
                <p className='text-secondary-color '>{product.description}</p>
            </div>   
        </div>
    )
}
export default ProductDetails