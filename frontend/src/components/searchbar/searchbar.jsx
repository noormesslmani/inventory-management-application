import React from 'react';
import Button from '../buttons/button';
const SearchBar = ({isLoading, searchQuery, setSearchQuery, searchProducts}) => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        searchProducts();
    }
    return(
    <form onSubmit={handleSubmit} method='get' className='w-full flex sm:flex-row flex-col justify-between h-full items-end '>
        <div className='flex flex-col gap-y-3 sm:w-1/2 w-full'>
            <label htmlFor="header-search">
                <span className="sm:text-xl text-base text-secondary-color font-semibold">Search products</span>
            </label>
            <input
            type="text"
            placeholder="Search poducts"
            className='w-full h-10 border px-3 bg-gray-100'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            />
        </div>
        <Button 
        disabled={isLoading} 
        label='Search' 
        type='submit' 
        styles={`bg-secondary-color text-white sm:text-xl text-base sm:h-12  ${isLoading?'cursor-not-allowed opacity-50':''} `} 
        />
    </form>
    )
};

export default SearchBar;