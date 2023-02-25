import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/button';
import SearchBar from '../../components/searchbar/searchbar';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
import ItemTable from '../../components/tables/ItemTable';
import { useLocation, useNavigate } from 'react-router-dom'
import { getItemsByProductId, updateAnItem, deleteAnitem, addNewItems } from '../../api/item';
import DeleteModal from '../../components/modals/deleteModal';
import ProductDetails from '../../components/sideBars/productDetails';
import AddItemModal from '../../components/modals/itemModal';
const Items=()=>{

    const location = useLocation();
    const product= location.state?.product;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(null);
    const [items, setItems]=useState([]);
    const [readOnly, setReadOnly]=useState(true);

    const [itemProps, setItemProps]=useState({
        serialNumber:'',
        isSold:false,
        itemToDelete:null
    });
    
    const [isLoading, setIsloading]= useState(true);
    const [isDeleting, setIsDeleting]= useState(false);
    const [isSaving, setIsSaving]=useState(false);
    const [showDeleteModal, setShowDeleteModal]= useState(false);
    const [showItemModal, setShowItemModal]= useState(false);

    const [serialNumbers, setSerialNumbers]=useState([]);

    useEffect(()=>{
        getItems();
    },[currentPage]);

    const resetProps=()=>{
        setItemProps({
            serialNumber:'',
            isSold:false,
            itemToDelete:null
        });
        setShowDeleteModal(false);
        setShowItemModal(false);
        setSerialNumbers([]);
    }
   
    const getItems=async()=>{
        setIsloading(true);
        try{
            const res=await getItemsByProductId(product.id, currentPage);
            const itemsList= res.data.items.map(item=>({...item, readOnly:true}));
            setItems(itemsList);
            setTotalPages(res.data.total_pages);  
        }
        catch (error){
    
            toast.error(error.response.data.message);
        }
        finally{
            setIsloading(false);
        }
    }


    const handleEditItemClick=(target)=>{
        const itemList= items.map(item=>(item==target?{...item, readOnly:!target.readOnly}:item));
        setItems(itemList);
        setItemProps({
            serialNumber: target.serial_number,
            isSold: target.is_sold
        });
    }

    const updateItem=async(target)=>{
        if(target.is_sold!= itemProps.isSold || target.serialNumber!==itemProps.serialNumber){
            try{
                const res = await updateAnItem({
                    ...(target.is_sold!= itemProps.isSold  && { is_sold: itemProps.isSold}),
                    ...(target.serialNumber!==itemProps.serialNumber && { serial_number: itemProps.serialNumber }),
                },target.id);
                toast.success('Item updated successfully');
                if(target.is_sold!= itemProps.isSold){
                    getItems();
                }
                else{
                    const updatedItems= items.map(item=>target==item?{...res.data, readOnly:true}:item);
                    setItems(updatedItems);
                }   
            }
            catch (error){
        
                toast.error(error.response.data.message);
            }
        }
        resetProps();
    }

    const handleDeleteItemClick=(item)=>{
        setItemProps({...itemProps, itemToDelete:item});
        setShowDeleteModal(true);
    }

    const deleteItem=async ()=>{
        setIsDeleting(true)
        try{
            await deleteAnitem(itemProps.itemToDelete.id);
            getItems();
        }
        catch (error){
            toast.error(error.response.data.message);
        }
        finally{
            setIsDeleting(false);
            resetProps();
        }
    }

    const addItems=async ()=>{
        setIsSaving(true)
        try{
            const res = await addNewItems({product_id: product.id, items: serialNumbers});
            const updatedItems=[...res.data, ...items.splice(serialNumbers.length)];
            setItems(()=>updatedItems.map(item=>({...item, readOnly:true})));
           
            toast.success('Items successfully added');

        }
        catch (error){
            toast.error(error.response.data.message);
        }
        finally{
            setIsSaving(false)
            resetProps();
        }
    }

    return(
        <div className='w-screen min-h-screen p-3 flex flex-wrap box-border'>
            <ProductDetails product={product}/>
            <div className='flex flex-col items-center flex-1 px-5 py-3 gap-y-5  box-border'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-3xl text-secondary-color  font-semibold'>Items</p>
                    <Button disabled={isLoading} label='Add Items' handleClick={()=>setShowItemModal(true)} styles='bg-secondary-color text-lg font-medium' />
                </div>
                <div className='w-full flex flex-col p-3 box-border justify-between  rounded-lg h-32 bg-white drop-shadow-lg'>
                    <SearchBar searchProducts={null} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
                <div className='w-full flex flex-1 flex-col p-3 box-border rounded-lg bg-white drop-shadow-lg'>
                    <div className='flex justify-between items-center w-full'>
                        <p className='text-lg text-secondary-color font-semibold'>Items table</p>
                        {totalPages && !isLoading && 
                        <Paginate
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages} 
                        />}
                    </div>
                    {isLoading? <Spinner animation="border" variant="warning" className='justify-self-center self-center' />: 
                    <ItemTable
                        items={items}
                        readOnly={readOnly}
                        handleEditItemClick={handleEditItemClick}
                        setItemProps={setItemProps}
                        itemProps={itemProps}
                        handleSaveChanges={updateItem}
                        handleDeleteItemClick={handleDeleteItemClick}
                    />}
                </div>
            </div>
            <DeleteModal 
            show={showDeleteModal}
            handleClose={resetProps}
            targetProduct={itemProps.itemToDelete}
            deleteProduct={deleteItem}
            isDeleting={isDeleting}
            />
            <AddItemModal 
            show={showItemModal}
            closeModal={resetProps}
            serialNumbers={serialNumbers}
            setSerialNumbers={setSerialNumbers}
            isSaving={isSaving}
            saveChanges={addItems}
            />
        </div>
    )
}

export default Items;