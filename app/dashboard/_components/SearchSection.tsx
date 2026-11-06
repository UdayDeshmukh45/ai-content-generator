import { Search } from 'lucide-react'
import React from 'react'

interface SearchSectionProps {
  onSearchInput: (value: string) => void;
}

function SearchSection({onSearchInput}: SearchSectionProps) {
  return (
    <div className='p-10 bg-gradient-to-br from-black via-black to-black flex flex-col justify-center items-center text-white'>
      <h2 className='text-3xl font-bold'>Browse All Templates</h2>
      <p className='mt-1 text-gray-300'>What would you like to create today?</p>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-full md:w-[50%]'>
          <Search className='text-primary' />
          <input
            type="text"
            placeholder='Search'
            onChange={(event) => onSearchInput(event.target.value)}
            className='bg-transparent w-full outline-none text-black'
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
