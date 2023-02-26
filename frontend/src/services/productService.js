import { getProductsByPage, searchProductsByType, createNewProduct, deleteAProduct, editAProduct } from '../api/product';
import { toast } from 'react-toastify';
export const getProducts = async (currentPage, setTotalPages, setProducts, setIsloading) => {
  setIsloading(true);
  try {
    const res = await getProductsByPage(currentPage);
    setTotalPages(res.data.total_pages);
    setProducts(res.data.products);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    setIsloading(false);
  }
};

export const searchProducts = async (searchQuery, setCurrentPage, setProducts, setIsloading) => {
    setIsloading(true);
    try {
      const res = await searchProductsByType(searchQuery);
      setCurrentPage(1);
      setProducts(res.data.products);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsloading(false);
    }
}

//creating a new product request
export const createProduct=async(productProps, setProducts, products, currentPage)=>{
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
export const editProduct=async(productProps, products, setProducts)=>{
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

//deleting the products
export const deleteProduct=async (id, setIsDeleting, currentPage, setTotalPages, setProducts, setIsloading)=>{
    setIsDeleting(true);
    try{
        await deleteAProduct(id);
        toast.success('Product successfully deleted'); 
        getProducts(currentPage, setTotalPages, setProducts, setIsloading);
    }
    catch (error){
        toast.error(error.response.data.message);
    }
    finally{
        setIsDeleting(false);
    }
}


