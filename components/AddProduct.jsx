import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AddProduct = ({ setOpen }) => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(null)
  const [prices, setPrices] = useState([])
  const [desc, setDesc] = useState('')
  const [extras, setExtras] = useState([])
  const [extraOptions, setExtraOptions] = useState([])

  const handleExtraInput = e => {
    setExtras({ ...extras, [e.target.name]: e.target.value })
  }
  const handleExtra = e => {
    setExtraOptions(prev => [...prev, extras])
  }

  const changePrice = (e, index) => {
    const currentPrice = prices
    currentPrice[index] = e.target.value
    setPrices(currentPrice)
  }

  const handleCreate = async e => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'uploads')
    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/abdullah-048/image/upload',
        data
      )
      const { url } = uploadResponse.data
      console.log(extraOptions)
      const newProduct = {
        title,
        desc,
        prices,
        extras: extraOptions,
        img: url
      }
      await axios.post('http://localhost:3000/api/products', newProduct)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-screen h-screen bg-gray-100 bg-opacity-60 z-40 fixed top-0 flex items-center justify-center'>
      <div className='w-[500px] bg-white px-[30px] py-2 rounded-md flex flex-col opacity-100 justify-between relative'>
        <span
          className='cursor-pointer text-white absolute top-[-4%] p-1 right-[-3%] bg-black w-[30px] text-center rounded-full h-[5vh]'
          onClick={() => setOpen(false)}
        >
          X
        </span>
        <h1 className='font-bold text-4xl'>Add a new Pizza</h1>
        <div className='flex flex-col'>
          <label
            htmlFor='imgPicker'
            className='my-5 text-base font-medium cursor-pointer'
          >
            Choose an image
          </label>
          <input
            className='hidden outline-none border border-black rounded-md mb-1'
            type='file'
            name='imgPicker'
            id='imgPicker'
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor='imgPicker' className='mb-1 text-base font-medium'>
            Title
          </label>
          <input
            className=' outline-none border border-black rounded-md p-1 mb-1'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor='imgPicker' className='mb-1 text-base font-medium'>
            Desc
          </label>
          <textarea
            rows={4}
            className=' outline-none border border-black rounded-md p-1 mb-1'
            value={desc}
            onChange={e => setDesc(e.target.value)}
            type='text'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor='imgPicker' className='mb-1 text-base font-medium'>
            Prices
          </label>
          <div className='flex justify-between'>
            <input
              className=' outline-none border-b border-b-black mb-1 w-[25%]'
              type='number'
              placeholder='$ small'
              value={prices[0]}
              onChange={e => changePrice(e, 0)}
            />
            <input
              className=' outline-none border-b border-b-black mb-1 w-[25%]'
              type='number'
              placeholder='$ medium'
              value={prices[1]}
              onChange={e => changePrice(e, 1)}
            />
            <input
              className=' outline-none border-b border-b-black mb-1 w-[25%]'
              type='number'
              placeholder='$ large'
              value={prices[2]}
              onChange={e => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor='' className='mb-1 text-base font-medium'>
            Extras
          </label>
          <div className='flex justify-between'>
            <input
              className=' outline-none border border-black rounded-md p-1 mb-1'
              type='text'
              name='text'
              placeholder='Text'
              onChange={handleExtraInput}
            />
            <input
              className=' outline-none border border-black rounded-md p-1 mb-1'
              type='number'
              placeholder='Price'
              name='price'
              onChange={handleExtraInput}
            />
            <button
              onClick={handleExtra}
              className='bg-[#d1411e] text-white px-2 rounded-md h-[5vh]'
            >
              Add
            </button>
          </div>
          <div className='my-2 mx-0 flex flex-wrap'>
            {extraOptions?.map(extra => (
              <span
                key={extra.text}
                className='p-2 text-sm border border-teal-700 text-teal-700 bg-white rounded-md mr-2 mb-1 cursor-pointer hover:bg-teal-700 hover:text-white'
              >
                {extra.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className='p-2 w-full bg-teal-700 text-white rounded-sm hover:bg-teal-800'
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default AddProduct
