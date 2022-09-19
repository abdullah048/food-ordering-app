import axios from 'axios'
import React from 'react'

const Orders = ({ orders }) => {
  return (
    <div className='flex flex-col'>
      {orders?.map(order => (
        <span key={order._id}>{order._id}</span>
      ))}
    </div>
  )
}

export default Orders

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/orders')
  return {
    props: {
      orders: res.data
    }
  }
}
