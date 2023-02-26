import React from 'react';
import Pagination from '@mui/material/Pagination';
const Paginate = ({totalPages, currentPage, setCurrentPage}) => {
    return(
        <Pagination
        page={currentPage}
        onChange={(e, page)=>setCurrentPage(page)} 
        count={totalPages}
        size="small" 
        />
    )
};

export default Paginate;