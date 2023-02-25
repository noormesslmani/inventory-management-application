import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/tables/productTable';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/button';
import NavBar from '../../components/sideBars/navbar';
import SearchBar from '../../components/searchbar/searchbar';
import { getProductsByPage, searchProductsByType, createNewProduct, deleteAProduct, editAProduct } from '../../api/product';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
import AddProductModal from '../../components/modals/productModal';
import DeleteModal from '../../components/modals/deleteModal';
import { useNavigate } from "react-router-dom";
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

  
    

    //Query products on page change
    const getProducts=async()=>{
        setIsloading(true);
        try{
            const res=await getProductsByPage(currentPage);
            setTotalPages(res.data.total_pages);
            setProducts(res.data.products);
            
        }
        catch (error){
    
            toast.error(error.response.data.message);
        }
        finally{
            setIsloading(false);
        }
    }
    useEffect(()=>{
        getProducts()
    },[currentPage]);


    //search products by type
    const searchProducts=async()=>{
        setIsloading(true);
        try{
            const res=await searchProductsByType(searchQuery);
            setCurrentPage(1);
            setProducts(res.data.products);
        }
        catch (error){
      
            toast.error(error.response.data.message);
        }
        finally{
            setIsloading(false);
        }
    }

    
    //check if the user wants to add or edit a product and handle the request
    const handleSave=async()=>{
        setIsSaving(true);
        productProps.productToEdit? await editProduct(): await createProduct();
        resetProps();
        setIsSaving(false);  
    }


    //creating a new product request
    const createProduct=async()=>{
        try{
            const res=await createNewProduct({
                type: productProps.type, 
                description: productProps.description, 
                base64_image: productProps.base64 || ''});
            
            if(currentPage==1){
                const updatedProducts=[res.data,...products];
                setProducts(updatedProducts.slice(0, -1));
                
            }
            toast.success('product added successfully');
        }
        catch (error){
      
            toast.error(error.response.data.message);
        }
    }
    
    //editing a product request and checking which data are modified
    const editProduct=async()=>{
        try{
            const res=await editAProduct({
                ...(productProps.productToEdit.type!=productProps.type && { type: productProps.type}),
                ...(productProps.productToEdit.description!=productProps.description && { description: productProps.description }),
                ...(productProps.base64 && { base64_image: productProps.base64 })
            }, productProps.productToEdit.id);
           
            console.log(productProps.base64)
            const updatedProducts= products.map(product=>product==productProps.productToEdit? res.data: product);
            setProducts(updatedProducts);
            toast.success('product edited successfully');
        }
        catch (error){
            toast.error(error.response.data.message);
        }
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

    //deleting the products
    const deleteProduct=async (id)=>{
        setIsDeleting(true);
        try{
            await deleteAProduct(id);
            toast.success('Product successfully deleted'); 
            getProducts();
        }
        catch (error){
            toast.error(error.response.data.message);
        }
        finally{
            setIsDeleting(false);
            resetProps();
        }
    }

  
    const handleProductClick=(product)=>{
        navigate(`/products/${product.id}/items`, {state:{product}});
    }

  
    return(
        <div className='w-screen min-h-screen flex box-border'>
            <NavBar/>
            <div className='flex flex-col items-center flex-1 px-5 py-3 gap-y-5  box-border'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-3xl text-secondary-color  font-semibold'>Products</p>
                    <Button disabled={isLoading} label='New Product' handleClick={()=>setShowProductModal(true)} styles='bg-secondary-color text-lg font-medium' />
                </div>
                <div className='w-full flex flex-col p-3 box-border justify-between  rounded-lg h-32 bg-white drop-shadow-lg'>
                    <SearchBar searchProducts={searchProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
            deleteProduct={deleteProduct}
            isDeleting={isDeleting}
            />
        </div>
    )
}

export default Products;