import axios from 'axios'
import Head from 'next/head'
import React, { useState } from 'react'
import AddButton from '../components/AddButton'
import AddProduct from '../components/AddProduct'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'

export default function Home({ pizzaList, admin }) {
  const [open, setOpen] = useState(false)
  return (
    <div className=''>
      <Head>
        <title>Food Ordering App</title>
        <meta
          name='description'
          content='craftzfox food ordering application'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setOpen={setOpen} />}
      {open && <AddProduct setOpen={setOpen} />}
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const myCookie = ctx.req?.cookies || ''
  let admin = false

  if (myCookie.token === process.env.NEXT_PUBLIC_TOKEN) {
    admin = true
  }

  const res = await axios.get('http://localhost:3000/api/products')
  return {
    props: {
      pizzaList: res.data,
      admin
    }
  }
}
