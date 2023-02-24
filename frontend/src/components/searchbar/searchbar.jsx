import React from 'react';
import Button from '../buttons/button';
const SearchBar = ({searchQuery, setSearchQuery}) => (
    <form onSubmit={null} method='get' className='w-full flex justify-between h-full items-end '>
        <div className='flex flex-col gap-y-3 w-1/2'>
            <label htmlFor="header-search">
                <span className="text-xl text-secondary-color font-semibold">Search products</span>
            </label>
            <input
                type="text"
                placeholder="Search poducts"
                className='w-full h-10 border px-3 bg-gray-100'
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
            />
        </div>
        <Button label='Search' type='submit' styles='bg-secondary-color text-white text-xl h-12' />
    </form>
);

export default SearchBar;