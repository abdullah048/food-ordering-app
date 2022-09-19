import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Model from '../components/Model'
import { reset } from '../redux/cartSlice'
import { remove } from '../redux/modelSlice'

const Cart = () => {
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const cart = useSelector(state => state.cart)
  const { customer, address, phone } = useSelector(state => state.model.data)

  //FIXME: Stripe not working properly

  //FIXME: Paypal not working properly

  // const handleStripe = async () => {
  //   const stripe = await getStripe()
  //   try {
  //     const { data } = await axios.post('/api/stripe', {
  //       total: cart.total,
  //       quantity: cart.quantity,
  //       title: 'pizza delivery',
  //       customer,
  //       address,
  //       phone
  //     })
  //     stripe.redirectToCheckout({ sessionId: data.id })
  //     // await createOrder(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleCOD = () => {
    createOrder({ customer, address, phone, method: 0, total: cart.total })
  }

  const createOrder = async details => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/orders',
        details
      )
      data && router.push('/orders/' + data._id)
      dispatch(reset())
      dispatch(remove())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex mobile:flex-col mobile:p-[20px] tablet:p-[15px] tablet:flex-col p-[50px]'>
      <div className='flex flex-[2] mobile:shadow-2xl mobile:rounded-md mobile:mb-3'>
        <table className='w-[100%] border-separate border-spacing-[20px] mobile:flex mobile:flex-col mobile:items-center mobile:justify-center'>
          <tr className='mobile:hidden desktop:text-xl'>
            <th className=''>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart &&
            cart.products.map(product => (
              <tr
                className='mobile:flex mobile:flex-col mobile:items-center mobile:justify-center mb-5'
                key={product._id}
              >
                <td className=''>
                  <div className='relative w-[70px] h-[70px] desktop:ml-1 tablet:ml-2'>
                    <Image
                      src={product.img}
                      alt=''
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                </td>
                <td>
                  <span className='font-medium text-lg text-[#d1411e] desktop:text-xl'>
                    {product.title}
                  </span>
                </td>
                <td>
                  <span className='text-center mobile:text-base text-lg laptop:text-lg desktop:text-xl'>
                    {product && product.extras.map(extra => extra.text)}
                  </span>
                </td>
                <td className='mobile:my-1'>
                  <span className='text-center text-[#d1411e] text-xl border-b border-[#d1411e] desktop:text-xl mobile:before:content-["Price:"]'>
                    &nbsp;<strong>${product.price}</strong>
                  </span>
                </td>
                <td className='mobile:my-1'>
                  <span className='text-center text-lg desktop:text-xl mobile:before:content-["Quantity:"]'>
                    &nbsp;<strong>{product.quantity}</strong>
                  </span>
                </td>
                <td>
                  <span className='text-lg  desktop:text-xl mobile:before:content-["Total:"]'>
                    &nbsp;<strong>${product.price * product.quantity}</strong>
                  </span>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <div className='flex flex-[1] justify-end mobile:justify-center tablet:justify-center'>
        <div className='w-[90%] h-[300px] bg-[#333] mobile:rounded-md p-[50px] flex flex-col justify-between text-white'>
          <h2 className='text-2xl font-bold'>Cart Total</h2>
          <div className='totalText'>
            <b className='mr-[10px]'>SubTotal:</b>${cart.total}
          </div>
          <div className='totalText'>
            <b className='mr-[10px]'>Discount:</b>$0.00
          </div>
          <div className='mb-1'>
            <b className='mr-[10px]'>Total</b>${cart.total}
          </div>
          {cash ? (
            <div>
              {open ? (
                <div className='flex flex-col'>
                  <span
                    className=' bg-teal-700 px-5 py-2 text-center rounded-md cursor-pointer mb-2'
                    onClick={handleCOD}
                  >
                    Cash On Delivery
                  </span>
                  {/* <span
                    onClick={handleStripe}
                    className='bg-purple-600 px-5 py-2 text-center rounded-md cursor-pointer'
                  >
                    Stripe
                  </span> */}
                </div>
              ) : (
                <Model setOpen={setOpen} />
              )}
            </div>
          ) : (
            <button
              className='mt-3 text-white bg-[#d1411e] w-[70] h-[30] p-2 cursor-pointer rounded-sm hover:bg-[#8f250b]'
              onClick={() => setCash(true)}
            >
              CHECKOUT NOW!
            </button>
          )}
          {}
        </div>
      </div>
    </div>
  )
}

export default Cart
