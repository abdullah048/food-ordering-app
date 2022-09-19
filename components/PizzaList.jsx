import React from 'react'
import PizzaCard from './PizzaCard'

const PizzaList = ({ pizzaList }) => {
  return (
    <div className='py-5 px-2 flex flex-col items-center'>
      <h1 className='mobile:text-center my-3 font-bold text-3xl'>
        The BEST PIZZA IN TOWN!
      </h1>
      <p className='mobile:text-base text-xl my-2 text-[#444] w-[70%] mobile:w-[90%] text-justify'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta soluta
        ipsam obcaecati, recusandae iure voluptatibus placeat at repudiandae
        iste tenetur!
      </p>
      <div
        className='flex flex-wrap gap-2 items-center justify-center w-full'
        id='products'
      >
        {pizzaList &&
          pizzaList.map(pizza => <PizzaCard key={pizza._id} pizza={pizza} />)}
      </div>
    </div>
  )
}

export default PizzaList
