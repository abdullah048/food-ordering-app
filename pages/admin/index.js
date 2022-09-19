import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

const AdminIndex = ({ product, order }) => {
  const [productList, setProductList] = useState(product)
  const [orderList, setOrderList] = useState(order)
  const status = ['Preparing', 'On The Way', 'Delivered']

  const handleEdit = async id => {
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`)
      setProductList(productList.filter(product => product._id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`)
      setProductList(productList.filter(product => product._id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateStatus = async id => {
    const item = orderList.filter(order => order._id === id)[0]
    let currentStatus
    if (item.status < 2) {
      currentStatus = item.status
    } else {
      return
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/orders/${id}`,
        { status: currentStatus + 1 }
      )
      setOrderList([data, ...orderList.filter(order => order._id !== id)])
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex justify-between p-[50px]'>
      <div className='flex-[1]'>
        <h1 className='font-bold text-3xl'>Products</h1>
        <table className='w-[100%] border-spacing-[20px] border-separate text-left'>
          <tbody>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {productList?.map(item => (
              <tr key={item._id}>
                <td>
                  <Image
                    src={item.img}
                    alt=''
                    width={50}
                    height={50}
                    objectFit='cover'
                  />
                </td>
                <td>{`${item._id}`.slice(0, 5)}...</td>
                <td>{item.title}</td>
                <td>${item.prices[0]}</td>
                <td>
                  <button
                    className='border-none outline-none text-white p-1 cursor-pointer bg-teal-700 mr-2 rounded-sm'
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className='border-none outline-none text-white p-1 cursor-pointer bg-red-600 rounded-sm'
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex-[1]'>
        <h1 className='font-bold text-3xl'>Orders</h1>
        <table className='w-[100%] border-spacing-[20px] border-separate text-left'>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {orderList?.map(item => (
              <tr key={item._id}>
                <td>{`${item._id}`.slice(0, 5)}...</td>
                <td>{item.customer}</td>
                <td>
                  {item.status !== 2 ? (
                    <span className='text-red-600'>Unpaid</span>
                  ) : (
                    <span className='text-green-600'>Paid</span>
                  )}
                </td>
                <td>
                  {item.status !== 2 ? (
                    <span className='text-red-600'>{status[item.status]}</span>
                  ) : (
                    <span className='text-green-600'>
                      {status[item.status]}
                    </span>
                  )}
                </td>
                <td>${item.total}</td>
                <td>
                  <button
                    className='border-none outline-none text-white p-1 cursor-pointer bg-sky-400 rounded-sm'
                    onClick={() => updateStatus(item._id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminIndex

export const getServerSideProps = async ctx => {
  const myCookie = ctx.req?.cookies || ''
  console.log(myCookie)
  if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    }
  }
  const productResponse = await axios.get('http://localhost:3000/api/products')
  const orderResponse = await axios.get('http://localhost:3000/api/orders')

  return {
    props: {
      product: productResponse.data,
      order: orderResponse.data
    }
  }
}
