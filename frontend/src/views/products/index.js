import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/tables/productTable';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/button';
import NavBar from '../../components/navbar/navbar';
import SearchBar from '../../components/searchbar/searchbar';
import { getProductsByPage, searchProductsByType, createNewProduct, deleteProduct, deleteAProduct } from '../../api/product';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
import AddProductModal from '../../components/modals/addProductModal';
import DeleteModal from '../../components/modals/deleteModal';
const Products=()=>{
    
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(null);
    const [products, setProducts]=useState([]);
    const [isLoading, setIsloading]= useState(true);

    const [ProducType, setProductType]= useState('');
    const [ProductDescription, setProductDescription]= useState('');
    const [base64Image, setBase64Image]= useState('');
    const [showPorductModal, setShowProductModal]= useState(false);
    const [showDeleteModal, setShowDeleteModal]= useState(false);
    const [ProductToDeleteId, setProductToDeleteId]=useState(null);
   
    useEffect(()=>{
        getProducts()
    },[currentPage]);

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

    

    const createAProduct=async()=>{
        console.log(base64Image)
        try{
            const res=await createNewProduct({
                type: ProducType, 
                description: ProductDescription, 
                base64_image: base64Image || ''});
            
            if(currentPage==1){
                const updatedProducts=[{...res.data, count:0},...products];
                setProducts(updatedProducts.slice(0, -1));
                
            }
            toast.success('product added successfully');
        }
        catch (error){
      
            toast.error(error.response.data.message);
        }
        finally{
            setProductDescription('');
            setProductType('');
            setBase64Image(null);

        }
    }

  

    const handleDeleteProduct=(product)=>{
        setShowDeleteModal(true);
        setProductToDeleteId(product.id);
    }

    const deleteProduct=async (id)=>{
        try{
            const res=await deleteAProduct(id);
            console.log(res)   
        }
        catch (error){
        
            toast.error(error.response.data.message);
        }
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
                    <ProductTable products={products}
                   
                        handleDeleteProduct={handleDeleteProduct}   
                    />}
                </div>
            </div>
            <AddProductModal 
            show={showPorductModal}
            setShow={setShowProductModal}
            type={ProducType}
            description={ProductDescription}
            base64Image={base64Image}
            setType={setProductType}
            setDescription={setProductDescription}
            setBase64Image={setBase64Image}
            handleSave={createAProduct}
             />
             <DeleteModal 
             show={showDeleteModal}
             setShow={setShowDeleteModal}
             productId={ProductToDeleteId}
             deleteProduct={deleteProduct}
             />
        </div>
    )
}

export default Products;