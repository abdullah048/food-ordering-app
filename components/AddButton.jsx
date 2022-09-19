import React from 'react'

const AddButton = ({ setOpen }) => {
  return (
    <div
      className='p-2 m-5 bg-[#d1411e] w-[150px] rounded-md text-white font-medium text-center cursor-pointer'
      onClick={() => setOpen(true)}
    >
      Add New Pizza
    </div>
  )
}

export default AddButton
