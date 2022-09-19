import axios from 'axios'
import Image from 'next/image'
import React from 'react'

const Orders = ({ order }) => {
  const status = order.status

  const checkStatus = index => {
    if (index - status < 1) return 'done'
    if (index - status === 1) return 'inProgress'
    if (index - status > 1) return 'undone'
  }

  return (
    <div className='flex my-5 mobile:flex-col tablet:flex-col'>
      <div className='flex-[2] mb-5'>
        <div className='row'>
          <table className='w-[100%] mobile:border-separate mobile:border-spacing-1 border-separate border-spacing-[20px] text-center'>
            <tr className='mobile:hidden'>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className='mobile:flex mobile:flex-col mobile:items-center mobile:justify-center'>
              <td>
                <span className='font-medium text-lg text-[#d1411e] mobile:before:content-["Order-ID:"] mobile:before:text-black'>
                  &nbsp;{order._id}
                </span>
              </td>
              <td className='mobile:my-1'>
                <span className=' mobile:before:content-["Customer:"] mobile:before:font-medium'>
                  &nbsp;{order.customer}
                </span>
              </td>
              <td>
                <span className='mobile:before:content-["Address:"] mobile:before:font-medium'>
                  &nbsp;{order.address}
                </span>
              </td>
              <td className='mobile:my-1'>
                <span className='text-lg mobile:before:content-["Total:"] mobile:before:font-medium'>
                  <span className='font-bold'>&nbsp;${order.total}</span>
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div className='flex justify-around w-[80%] mobile:flex-col mobile:justify-center mobile:w-[100%] mobile:items-center mobile:py-1'>
          <div
            className={
              checkStatus(0) === 'done' && `flex flex-col items-center mb-5`
            }
          >
            <Image
              src='/img/paid.png'
              alt='paid-icon'
              width='30px'
              height='30px'
              objectFit='contain'
            />
            <span>Payment</span>
            <div
              className={
                checkStatus(0) === 'done' && 'w-[20px] h-[20px] relative'
              }
            >
              <Image
                src='/img/checked.png'
                alt='check-icon'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
          <div
            className={
              checkStatus(1) === 'inProgress' &&
              `flex flex-col items-center animate-pulse  mb-5`
            }
          >
            <Image
              src='/img/bake.png'
              alt='paid-icon'
              width='30px'
              height='30px'
              objectFit='contain'
            />
            <span>Preparing</span>
            <div className={checkStatus(1) === 'inProgress' && 'hidden'}>
              <Image
                src='/img/checked.png'
                alt='check-icon'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
          <div
            className={
              checkStatus(2) === 'undone' &&
              `flex flex-col items-center opacity-[0.3]   mb-5`
            }
          >
            <Image
              src='/img/bike.png'
              alt='paid-icon'
              width='30px'
              height='30px'
              objectFit='contain'
            />
            <span>On the way</span>
            <div className={checkStatus(2) === 'undone' && 'hidden'}>
              <Image
                src='/img/checked.png'
                alt='check-icon'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
          <div
            className={
              checkStatus(3) === 'undone' &&
              `flex flex-col items-center opacity-[0.3]  mb-5`
            }
          >
            <Image
              src='/img/delivered.png'
              alt='paid-icon'
              width='30px'
              height='30px'
              objectFit='contain'
            />
            <span>Delivered</span>
            <div className={checkStatus(3) === 'undone' && 'hidden'}>
              <Image
                src='/img/checked.png'
                alt='check-icon'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex-[1] mr-3 mobile:mr-0 tablet:mr-0'>
        <div className='flex flex-[1] justify-end mobile:justify-center tablet:justify-center'>
          <div className='w-[90%] h-[300px] bg-[#333] p-[50px] flex flex-col justify-between text-white'>
            <h2 className='text-2xl font-bold'>Cart Total</h2>
            <div className='totalText'>
              <b className='mr-[10px]'>SubTotal:</b>${order.total}
            </div>
            <div className='totalText'>
              <b className='mr-[10px]'>Discount:</b>$0.00
            </div>
            <div className='totalText'>
              <b className='mr-[10px]'>Total</b>${order.total}
            </div>
            <button
              disabled
              className='mt-3 text-teal-700 bg-white w-[70] h-[30] p-2 cursor-not-allowed rounded-sm hover:bg-teal-700 hover:text-white'
            >
              PAID
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/orders/${params.id}`
  )
  return {
    props: {
      order: data
    }
  }
}
