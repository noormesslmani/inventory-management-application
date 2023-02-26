import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

function ProductTable({products, handleDeleteProductClick, handleEditProductClick, handleProductClick}) {
  return (
    <Table responsive className='w-full'>
      <thead>
        <tr>
          <th className='text-xs sm:text-base'>Id</th>
          <th className='text-xs sm:text-base'>Product Type</th>
          <th className='text-xs sm:text-base'>Count</th>
          <th className='text-xs sm:text-base'>Tools</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
           <tr key={index}>
           <td className='text-xs sm:text-base'>{product.id}</td>
           <td className='hover:bg-primary-color hover:text-white font-medium hover:cursor-pointer text-xs sm:text-base'>
            <div className='flex gap-x-3 text-ellipsis overflow-hidden  ' onClick={()=>handleProductClick(product)}>
              <img alt='Product-image' src={`http://localhost:8000/images/${product.image}`} className='w-7 h-7 hidden sm:block' />
               {product.type}
            </div>
            </td>
           <td className='text-xs sm:text-base'>{product.count}</td>
           <td  >
            <div className='flex gap-x-3'>
              <FaRegEdit color='#054168' size={20} onClick={()=>handleEditProductClick(product)} />
              <MdDelete color= '#434343' size={20} onClick={()=>handleDeleteProductClick(product)}  />
            </div>
           </td>
         </tr>
          ))}
        
      </tbody>
    </Table>
  );
}

export default ProductTable;