import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';
function ItemTable({items, handleDeleteItemClick, handleEditItemClick, handleSaveChanges, setItemProps, itemProps}) {
  
  return (
    <Table responsive className='w-full'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Serial Number</th>
          <th>Sold</th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, index) => (
           <tr key={index}>
           <td>{item.id}</td>
           <td>
            <input 
            type='text' 
            value={item.readOnly?item.serial_number: itemProps.serialNumber} 
            readOnly={item.readOnly} 
            onChange={(e)=>setItemProps({...itemProps, serialNumber: e.target.value})}
            className={`px-1 border-none focus:border-none focus:outline-none ${!item.readOnly? 'border':''}`}/></td>
           <td>
            <input 
            type='checkbox' 
            checked={item.readOnly?item.is_sold: itemProps.isSold} 
            onChange={(e)=>setItemProps({...itemProps, isSold: e.target.checked})}
            
            disabled={item.readOnly}  />
            </td>
           <td >
            <div className='flex gap-x-3'>
              {item.readOnly?
              <FaRegEdit color='#054168' size={20} onClick={()=>handleEditItemClick(item)} />:
              <TiTick color='#054168' size={25} onClick={()=>handleSaveChanges(item)} />
              }
              <MdDelete color= '#434343' size={20} onClick={()=>handleDeleteItemClick(item)}  />
            </div>
           </td>
         </tr>
        ))}
        
      </tbody>
    </Table>
  );
}

export default ItemTable;