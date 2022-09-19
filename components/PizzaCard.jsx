import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PizzaCard = ({ pizza }) => {
  return (
    <div className='w-[22%] mobile:w-[100%] px-5 py-3 flex flex-col items-center justify-center cursor-pointer'>
      <Link href={`/product/${pizza._id}`} passHref>
        <Image src={pizza.img} alt='pizza' width='200' height='200' />
      </Link>
      <h1 className='text-lg font-bold text-[#d1411e] '>{pizza.title}</h1>
      <span className='text-lg font-bold text-[#666]'>${pizza.prices[1]}</span>
      <p className='text-justify text-[#777]'>{pizza.desc}</p>
    </div>
  )
}

export default PizzaCard
