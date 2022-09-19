import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../redux/modelSlice'

const Model = ({ setOpen }) => {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  return (
    <div className='w-[100%] mobile:w-[100%] h-[77vh] tablet:h-[88vh] mobile:h-[85vh] desktop:h-[77vh] z-10 absolute top-12 mobile:top-20 left-0 flex items-center justify-center bg-[#d1cdcd] mobile:px-2'>
      <div className='text-black bg-white w-[500px] px-5 py-3 rounded-md'>
        <h1 className='font-thin text-3xl mb-3 text-center'>
          Enter your details.
        </h1>
        <div className='font-medium text-xl mb-3'>
          <label htmlFor='' className=''>
            Name:
          </label>
          <input
            type='text'
            className='outline-none border-2 border-slate-300 rounded-md w-[100%] mt-2 p-1'
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            placeholder='Name'
          />
        </div>
        <div className='font-medium text-xl mb-1'>
          <label htmlFor='' className=''>
            Address:
          </label>
          <input
            type='text'
            className='outline-none border-2 border-slate-300 rounded-md w-[100%] mt-2 p-1'
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder='Elton St. 505 NY'
          />
        </div>
        <div className='font-medium text-xl mb-1'>
          <label htmlFor='' className=''>
            PhoneNo:
          </label>
          <input
            type='text'
            className='outline-none border-2 border-slate-300 rounded-md w-[100%] mt-2 p-1'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='+92 XXXXXXXX'
          />
        </div>
        <button
          className='bg-[#d1411e] text-white px-2 py-1 mt-2 rounded-md w-[50%] mobile:h-[10vh] h-[7vh]'
          onClick={() => {
            if (address !== '' && phone !== '' && customer !== '') {
              dispatch(addData({ customer, address, phone }))
              setOpen(true)
            } else {
              alert('All feilds are required')
            }
          }}
        >
          Select Payment Method
        </button>
      </div>
    </div>
  )
}

export default Model
