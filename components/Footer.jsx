import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-[calc(100vh-100px)] mobile:h-auto mobile:text-center bg-[#222] flex'>
      <div className='mobile:hidden flex-1 relative flex'>
        <Image
          src='/img/bg.png'
          alt='footer-bg'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='mobile:flex-col flex-[2] relative flex p-12 justify-between'>
        <div className='flex-1 px-5'>
          <h2 className='text-xl font-bold text-slate-300 my-2'>
            OUR MOTTO! BEST BAKED PIZZA.
          </h2>
        </div>
        <div className='flex-1 px-5'>
          <h1 className='text-2xl font-bold text-[#b7903c]'>
            FIND OUR RESTURANT
          </h1>
          <p className='text-slate-400 py-4'>
            72-x-block, Abid Shaheed Road
            <br />
            Madina town, Faisalabad.
            <br />
            +92 307-7750051
          </p>
          <p className='text-slate-400'>
            24-x-26, X-Block Saifullah Road
            <br />
            Madina town, Faisalabad.
            <br />
            +92 307-7750051
          </p>
        </div>
        <div className='flex-1 px-5 my-3'>
          <h1 className='text-2xl font-bold text-[#b7903c]'>WORKING HOURS</h1>
          <p className='text-slate-400 py-2'>
            MONDAY TO FRIDAY
            <br />
            9:00 - 8:00
          </p>
          <p className='text-slate-400'>
            SATURDAY TO SUNDAY
            <br /> 12:00 - 12:00
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
