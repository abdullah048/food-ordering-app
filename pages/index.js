import Head from 'next/head'
import React from 'react'
import Featured from '../components/Featured'

export default function Home() {
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
    </div>
  )
}
