import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[100px] px-[50px] bg-[#d1411e] flex justify-between items-center sticky top-0 text-white'>
      <div className=' flex-[1] flex items-center'>
        <div className='bg-white rounded-full p-2'>
          <Image
            src='/img/telephone.png'
            alt='telephone'
            width='32'
            height='32'
          />
        </div>
        <div className='ml-5'>
          <div className='font-medium text-xs'>ORDER NOW!</div>
          <div className='font-bold text-base'>+92 307-7750051</div>
        </div>
      </div>
      <div className='flex-[3] flex items-center'>
        <ul className='flex flex-1 items-center justify-evenly'>
          <li className='cursor-pointer'>Home</li>
          <li className='cursor-pointer'>Products</li>
          <li className='cursor-pointer'>Menu</li>
          <span className='font-bold text-xl border-2 border-white p-2 rounded-full'>
            Craftzfox
          </span>
          <li className='cursor-pointer'>Events</li>
          <li className='cursor-pointer'>Blog</li>
          <li className='cursor-pointer'>Contact</li>
        </ul>
      </div>
      <div className='flex-[1] flex items-center justify-end'>
        <div className='relative cursor-pointer'>
          <Image src='/img/cart.png' alt='cart' width='30' height='30' />
          <div className='font-bold absolute top-[-30%] left-[60%] text-[#d1411e] bg-white rounded-full p-1 w-[20px] h-[20px] flex items-center justify-center'>
            2
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
