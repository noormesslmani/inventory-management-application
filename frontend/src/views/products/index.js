import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/tables/productTable';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/button';
import NavBar from '../../components/navbar/navbar';
import SearchBar from '../../components/searchbar/searchbar';
import { getProductsByPage } from '../../api/product';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
const Products=()=>{
    
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(null);
    const [products, setProducts]=useState([]);
    const [isLoading, setIsloading]= useState(true);
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
  
    return(
        <div className='w-screen min-h-screen flex box-border'>
            <NavBar/>
            <div className='flex flex-col items-center flex-1 px-5 py-3 gap-y-5  box-border'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-3xl text-secondary-color  font-semibold'>Products</p>
                    <Button label='New Product' handleClick={null} styles='bg-secondary-color text-lg font-medium' />
                </div>
                <div className='w-full flex flex-col p-3 box-border justify-between  rounded-lg h-32 bg-white drop-shadow-lg'>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                    {isLoading? <Spinner animation="border" variant="warning" className='justify-self-center self-center' />: <ProductTable products={products}/>}
                </div>
            </div>
            
        </div>
    )
}

export default Products;