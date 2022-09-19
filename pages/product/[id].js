import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(pizza.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const handleChange = (e, toppings) => {
    const checked = e.target.checked
    if (checked) {
      handlePrice(toppings.price)
      setExtras(prevState => [...prevState, toppings])
    } else {
      handlePrice(-toppings.price)
      setExtras(extras.filter(extra => extra._id !== toppings._id))
    }
  }

  const handleSize = index => {
    const difference = pizza.prices[index] - pizza.prices[size]
    setSize(index)
    handlePrice(difference)
  }

  const handlePrice = number => {
    setPrice(price + number)
  }

  const handleCart = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }))
  }

  return (
    <div className='h-[calc(100vh-100px)] mobile:h-auto tablet:h-auto mobile:flex-col flex mobile:text-center'>
      <div className='flex-1 h-[100%] flex items-center justify-center'>
        <div className='w-[80%] h-[80%] mobile:w-[70vw] mobile:h-[70vw] tablet:w-[40vw] tablet:h-[40vw] mobile:mt-5 tablet:mt-5 relative'>
          <Image src={pizza.img} alt='pizza' layout='fill' />
        </div>
      </div>
      <div className='flex-1 p-5'>
        <h1 className='text-4xl font-bold mb-4'>{pizza.title}</h1>
        <span className='my-3 text-[#d1411e] text-2xl border-b border-b-[#d1411e]'>
          ${price}
        </span>
        <p className='my-3 text-lg text-[#666]'>{pizza.desc}</p>
        <h3 className='font-bold text-xl'>Choose the size</h3>
        <div className='flex justify-between w-[40%] my-2 mobile:w-[100%] tablet:w-[70%] mobile:px-5'>
          <div
            className='relative w-[30px] h-[30px] cursor-pointer'
            onClick={() => handleSize(0)}
          >
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className='absolute top-[-5px] right-[-20px] bg-teal-700 text-white text-xs px-[5px] rounded-sm'>
              Small
            </span>
          </div>
          <div
            className='relative w-[40px] h-[40px] cursor-pointer'
            onClick={() => handleSize(1)}
          >
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className='absolute top-[-5px] right-[-20px] bg-teal-700 text-white text-xs px-[5px] rounded-sm'>
              Medium
            </span>
          </div>
          <div
            className='relative w-[50px] h-[50px] cursor-pointer'
            onClick={() => handleSize(2)}
          >
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className='absolute top-[-5px] right-[-20px] bg-teal-700 text-white text-xs px-[5px] rounded-sm'>
              Large
            </span>
          </div>
        </div>
        <h3 className='text-xl font-bold my-2'>
          Choose Additional Ingredients
        </h3>
        <div className='flex mb-[30px] mobile:flex-col tablet:flex-col laptop:flex-col mobile:ml-12'>
          {pizza.extras &&
            pizza.extras.map(toppings => (
              <div className='flex items-center my-1' key={pizza._id}>
                <input
                  type='checkbox'
                  name={toppings.text}
                  id={toppings.text}
                  className='mr-2 tablet:w-[20px] tablet:h-[16px] mobile:w-[20px] mobile:h-[15px] w-[25px] h-[25px]'
                  onChange={e => handleChange(e, toppings)}
                />
                <label
                  htmlFor={toppings.text}
                  className='font-normal mobile:text-sm tablet:text-base laptop:text-base text-xl'
                >
                  {toppings.text}
                </label>
              </div>
            ))}
        </div>
        <div className='add'>
          <input
            type='number'
            name=''
            id=''
            defaultValue={1}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className='w-[50px] mobile:h-[30px] h-[50px] text-center border border-slate-800 outline-none rounded-sm'
          />
          <button
            className='mobile:h-[30px] h-[50px] bg-[#d1411e] mx-2 text-white rounded-sm px-5 cursor-pointer border-none outline-none'
            onClick={handleCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({ params }) => {
  const product = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  )
  return {
    props: {
      pizza: product.data
    }
  }
}
