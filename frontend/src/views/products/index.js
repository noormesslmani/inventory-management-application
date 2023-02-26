import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/tables/productTable';
import Button from '../../components/buttons/button';
import NavBar from '../../components/sideBars/navbar';
import SearchBar from '../../components/searchbar/searchbar';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
import AddProductModal from '../../components/modals/productModal';
import DeleteModal from '../../components/modals/deleteModal';
import { useNavigate } from "react-router-dom";
import empty from '../../assets/empty.png';
import { getProducts, searchProducts, createProduct, editProduct, deleteProduct } from '../../services/productService';
const Products=()=>{
    const navigate= useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(null);
    const [products, setProducts]=useState([]);


    const [isLoading, setIsloading]= useState(true);
    const [isDeleting, setIsDeleting]= useState(false);
    const [isSaving, setIsSaving]= useState(false);
   
    const [productProps, setProductProps]=useState(
        {
            type:'',
            description:'',
            defaultImage:'no-image.png',
            image:null,
            productToDelete:null,
            productToEdit:null
        }
    )

    //controlling modals display
    const [showPorductModal, setShowProductModal]= useState(false);
    const [showDeleteModal, setShowDeleteModal]= useState(false);
    
    //reset props to initial values
    const resetProps=()=>{
        setProductProps({
            type:'',
            description:'',
            defaultImage:'no-image.png',
            image:null,
            productToDelete:null,
            productToEdit:null
        });
        setShowProductModal(false);
        setShowDeleteModal(false);
    }

  
    //retrieving products
    useEffect(() => {
        getProducts(currentPage, setTotalPages, setProducts, setIsloading);
      }, [currentPage]);
    

    
    const handleSearch = () => {
    setCurrentPage(1);
    searchProducts(searchQuery, setCurrentPage, setProducts, setIsloading);
    };

    
    //check if the user wants to add or edit a product and handle the request
    const handleSave=async()=>{
        setIsSaving(true);
        productProps.productToEdit? 
        await editProduct(productProps, products, setProducts): 
        await createProduct(productProps, setProducts, products, currentPage);
        resetProps();
        setIsSaving(false);  
    }


    //handle the click on edit product icon
    const handleEditProductClick=(product)=>{
        setProductProps(
            {
                type:product.type,
                description:product.description,
                defaultImage:product.image,
                base64:null,
                productToDelete:null,
                productToEdit:product
            }
        )
        setShowProductModal(true);
    }

    //handle the click on delete product icon
    const handleDeleteProductClick=(product)=>{
        setShowDeleteModal(true);
        const updatedProps={...productProps, productToDelete: product}
        setProductProps(updatedProps);
    }

    //handle deleting the product
    const handleDeleteProduct=(id)=>{
        deleteProduct(id,setIsDeleting,currentPage,setTotalPages,setProducts, setIsloading);
        resetProps();
    }

  
    //navigating to Item view on product click
    const handleProductClick=(product)=>{
        navigate(`/products/${product.id}/items`, {state:{product}});
    }

  
    return(
        <div className='w-screen min-h-screen flex box-border'>
            <NavBar/>
            <div className='flex flex-col items-center flex-1 px-5 py-3 gap-y-5  box-border'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-3xl text-secondary-color  font-semibold'>Products</p>
                    <Button 
                    disabled={isLoading} 
                    label='New Product' 
                    handleClick={()=>setShowProductModal(true)} 
                    styles={`bg-secondary-color text-lg font-medium ${isLoading?'cursor-not-allowed opacity-50':''}`} />
                </div>
                <div className='w-full flex flex-col p-3 box-border justify-between  rounded-lg sm:h-32 h-40 bg-white drop-shadow-lg'>
                    <SearchBar 
                    isLoading={isLoading}
                    searchProducts={handleSearch} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} />
                </div>
                <div className='w-full flex flex-1 flex-col p-3 box-border rounded-lg bg-white drop-shadow-lg'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='text-lg text-secondary-color font-semibold'>Porducts table</p>
                        {totalPages && !isLoading && 
                        <Paginate
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages} 
                        />}
                    </div>
                    {isLoading? <Spinner animation="border" variant="warning" className='justify-self-center self-center' />: 
                    products.length==0?
                    <div className='justify-self-center self-center flex flex-col items-center'>
                        <img src={empty} className='w-64  '/>
                        <p className='text-secondary-color text-lg font-semibold' >No Products found :(</p>
                    </div>:
                    <ProductTable 
                    products={products}
                    handleProductClick={handleProductClick}
                    handleDeleteProductClick={handleDeleteProductClick}   
                    handleEditProductClick={handleEditProductClick}
                    />}
                </div>
            </div>

            <AddProductModal 
            show={showPorductModal}
            handleClose={resetProps}
            productProps={productProps}
            setProductProps={setProductProps}
            handleSave={handleSave}
            isSaving={isSaving}
            />

            <DeleteModal 
            show={showDeleteModal}
            handleClose={resetProps}
            targetProduct={productProps.productToDelete}
            deleteProduct={handleDeleteProduct}
            isDeleting={isDeleting}
            />
        </div>
    )
}

export default Products;