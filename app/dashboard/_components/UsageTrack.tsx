"use client"
import React from 'react'

function UsageTrack() {
  return (
    <div className='m-5'>
      <div className='bg-primary text-white p-3 rounded-lg'>
        <h2 className='font-medium text-sm'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div className='h-2 bg-white rounded-full' style={{ width: '35%' }}></div>
        </div>
        <h2 className='text-xs my-2'>Free Tier Plan</h2>
      </div>
    </div>
  )
}

export default UsageTrack
