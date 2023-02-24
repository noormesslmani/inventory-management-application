import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

function ProductTable({products, handleDeleteProduct}) {
  return (
    <Table responsive className='w-full'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Product Type</th>
          <th>Count</th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
           <tr key={index}>
           <td>{product.id}</td>
           <td>
            <div className='flex gap-x-3 text-ellipsis overflow-hidden' onClick={()=>console.log('hi')}>
              <img src={`http://localhost:8000/${product.image}`} className='w-7 h-7' />
              {product.type}
            </div>
            </td>
           <td>{product.count}</td>
           <td >
            <div className='flex gap-x-3'>
              <FaRegEdit color='#054168' size={20}/>
              <MdDelete color= '#434343' size={20} onClick={()=>handleDeleteProduct(product)}  />
            </div>
           </td>
         </tr>
          ))}
        
      </tbody>
    </Table>
  );
}

export default ProductTable;