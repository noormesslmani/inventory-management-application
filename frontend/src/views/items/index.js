import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/button';
import SearchBar from '../../components/searchbar/searchbar';
import Paginate from '../../components/pagination/pagination';
import Spinner from 'react-bootstrap/Spinner';
import ItemTable from '../../components/tables/ItemTable';
import { useLocation, useNavigate } from 'react-router-dom'
import DeleteModal from '../../components/modals/deleteModal';
import ProductDetails from '../../components/sideBars/productDetails';
import AddItemModal from '../../components/modals/itemModal';
import empty from '../../assets/empty.png';
import { getItems, updateItem, deleteItem, addItems, searchItems } from '../../services/itemService';
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

    //retreive products by page
    useEffect(()=>{
        getItems(setIsloading, product, currentPage,setItems,setTotalPages);
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
   
    //handle click on edit icon
    const handleEditItemClick=(target)=>{
        const itemList= items.map(item=>(item==target?{...item, readOnly:!target.readOnly}:item));
        setItems(itemList);
        setItemProps({
            serialNumber: target.serial_number,
            isSold: target.is_sold
        });
    }

    //updating item
    const handleUpdateItem=async(target)=>{
        updateItem(target,itemProps, setIsloading, product, currentPage,setItems,setTotalPages,items);
        resetProps();
    }

    //hanlde click on delete icon
    const handleDeleteItemClick=(item)=>{
        setItemProps({...itemProps, itemToDelete:item});
        setShowDeleteModal(true);
    }

    //deleting an item
    const handleDeleteItem=async ()=>{
        deleteItem(setIsDeleting, itemProps, setIsloading, product, currentPage,setItems,setTotalPages);
        resetProps();
    }

    //adding items
    const handleAddItems=async ()=>{
        setIsSaving(true);
        addItems(setIsSaving, product, serialNumbers,items, setItems);
        resetProps();
    }

    //searching items
    const handleSearchItems=async()=>{
        searchItems(setIsloading, searchQuery, product, setCurrentPage, setItems);
    }

    

    return(
        <div className='w-screen min-h-screen p-3 flex flex-wrap box-border justify-center'>
            <ProductDetails product={product}/>
            <div className='flex flex-col items-center flex-1 px-5 py-3 gap-y-5  box-border'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-3xl text-secondary-color  font-semibold'>Items</p>
                    <Button 
                    disabled={isLoading} 
                    label='Add Items' 
                    handleClick={()=>setShowItemModal(true)} 
                    styles={`bg-secondary-color text-lg font-medium ${isLoading?'cursor-not-allowed opacity-50':''}`} 
                    />
                </div>
                <div className='w-full flex flex-col p-3 box-border justify-between  rounded-lg sm:h-32 h-40 bg-white drop-shadow-lg'>
                    <SearchBar 
                    isLoading={isLoading} 
                    searchProducts={handleSearchItems} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} />
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
                    items.length==0?
                    <div className='justify-self-center self-center flex flex-col items-center'>
                        <img src={empty} className='w-64  '/>
                        <p className='text-secondary-color text-lg font-semibold' >No Items found :(</p>
                    </div>
                    :
                    <ItemTable
                        items={items}
                        readOnly={readOnly}
                        handleEditItemClick={handleEditItemClick}
                        setItemProps={setItemProps}
                        itemProps={itemProps}
                        handleSaveChanges={handleUpdateItem}
                        handleDeleteItemClick={handleDeleteItemClick}
                    />}
                </div>
            </div>
            <DeleteModal 
            show={showDeleteModal}
            handleClose={resetProps}
            targetProduct={itemProps.itemToDelete}
            deleteProduct={handleDeleteItem}
            isDeleting={isDeleting}
            />
            <AddItemModal 
            show={showItemModal}
            closeModal={resetProps}
            serialNumbers={serialNumbers}
            setSerialNumbers={setSerialNumbers}
            isSaving={isSaving}
            saveChanges={handleAddItems}
            />
        </div>
    )
}

export default Items;