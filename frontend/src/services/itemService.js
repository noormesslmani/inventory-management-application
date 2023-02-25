import { getItemsByProductId, updateAnItem, deleteAnitem, addNewItems, searchItemsBySerialNumber } from '../api/item';
import { toast } from 'react-toastify';
export const getItems=async(setIsloading, product, currentPage,setItems,setTotalPages)=>{
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

export const updateItem=async(target,itemProps, setIsloading, product, currentPage,setItems,setTotalPages,items)=>{
    if(target.is_sold!= itemProps.isSold || target.serialNumber!==itemProps.serialNumber){
        try{
            const res = await updateAnItem({
                ...(target.is_sold!= itemProps.isSold  && { is_sold: itemProps.isSold}),
                ...(target.serialNumber!==itemProps.serialNumber && { serial_number: itemProps.serialNumber }),
            },target.id);
            toast.success('Item updated successfully');
            if(target.is_sold!= itemProps.isSold){
                getItems(setIsloading, product, currentPage,setItems,setTotalPages);
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

}

export const deleteItem=async (setIsDeleting, itemProps, setIsloading, product, currentPage,setItems,setTotalPages)=>{
    setIsDeleting(true)
    try{
        await deleteAnitem(itemProps.itemToDelete.id);
        getItems(setIsloading, product, currentPage,setItems,setTotalPages);
    }
    catch (error){
        toast.error(error.response.data.message);
    }
    finally{
        setIsDeleting(false);
    }
}

export const addItems=async (setIsSaving, product, serialNumbers,items, setItems)=>{
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
    
    }
}

export const searchItems=async(setIsloading, searchQuery, product, setCurrentPage, setItems)=>{
    setIsloading(true);
    console.log(searchQuery)
    console.log(product.id)
    try{
        const res=await searchItemsBySerialNumber(searchQuery, product.id);
        setCurrentPage(1);
     
        setItems(()=>res.data.items.map(item=>({...item, readOnly:true})));
    }
    catch (error){
        toast.error(error.response.data.message);
    }
    finally{
        setIsloading(false);
    }
  }