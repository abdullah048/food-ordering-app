import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className='h-[100px] px-[50px] bg-[#d1411e] flex justify-between items-center sticky top-0 text-white z-20'>
      <div className='mobile:flex-[3] tablet:flex-[1.5] flex-[1] flex items-center'>
        <div className='bg-white rounded-full p-2'>
          <Image
            src='/img/telephone.png'
            alt='telephone'
            width='32'
            height='32'
          />
        </div>
        <div className='ml-5 mobile:w-[80%]'>
          <div className='font-medium text-xs'>ORDER NOW!</div>
          <div className='mobile:text-xs font-bold text-base'>
            +92 307-7750051
          </div>
        </div>
      </div>
      <div className='mobile:hidden tablet:hidden laptop:flex-[3] laptop:flex laptop:items-center desktop:flex-[3] desktop:flex desktop:items-center'>
        <ul className='flex flex-1 items-center justify-evenly'>
          <li className='cursor-pointer'>
            <Link href='/'>Home</Link>
          </li>
          <li className='cursor-pointer'>
            <Link href='/#products'>Products</Link>
          </li>
          <li className='cursor-pointer'>Menu</li>
          <span className='tablet:font-bold tablet:text-xl tablet:border-2 tablet:border-white tablet:p-2 tablet:rounded-full laptop:font-bold laptop:text-xl laptop:border-2 laptop:border-white laptop:p-2 laptop:rounded-full desktop:font-bold desktop:text-xl desktop:border-2 desktop:border-white desktop:p-2 desktop:rounded-full'>
            Craftzfox
          </span>
          <li className='cursor-pointer'>Events</li>
          <li className='cursor-pointer'>Blog</li>
          <li className='cursor-pointer'>Contact</li>
        </ul>
      </div>
      <span className='tablet:text-center laptop:hidden mobile:hidden desktop:hidden tablet:font-bold tablet:text-xl tablet:border-2 tablet:border-white tablet:p-2 tablet:rounded-full'>
        Craftzfox
      </span>
      <div className='flex-[1] flex items-center justify-end'>
        <Link href='/cart'>
          <div className='relative cursor-pointer'>
            <Image src='/img/cart.png' alt='cart' width='30' height='30' />
            <div className='font-bold absolute top-[-30%] left-[60%] text-[#d1411e] bg-white rounded-full p-1 w-[20px] h-[20px] flex items-center justify-center'>
              {quantity}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
