import Image from 'next/image'
import React, { useState } from 'react'

const Featured = () => {
  const featuredImages = ['/img/featured.jpg', '/img/featured2.jpg']
  const [carouselIndex, setCarouselIndex] = useState(0)

  const handleArrow = direction => {
    if (direction === 'left') {
      setCarouselIndex(carouselIndex !== 0 ? carouselIndex - 1 : 1)
    }
    if (direction === 'right') {
      setCarouselIndex(carouselIndex !== 1 ? carouselIndex + 1 : 0)
    }
  }
  return (
    <div className='mobile:h-[50vh] tablet:h-[65vh] relative h-[calc(100vh-100px)] bg-[#d1411e] overflow-hidden'>
      <div
        className='absolute w-[10%] h-[20%] top-0 bottom-0 left-0 m-auto z-10 cursor-pointer'
        onClick={() => handleArrow('left')}
      >
        <Image
          src='/img/arrowl.png'
          alt='arrow-left'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div
        className={`w-[300vw] h-[100%] flex transition-all duration-[1.5s] ease-in-out`}
        style={{
          transform: `translateX(${-100 * carouselIndex}vw)`
        }}
      >
        {featuredImages.map((img, index) => (
          <div className='w-[100vw] h-[100%] relative' key={index}>
            <Image src={img} alt='slider' layout='fill' objectFit='cover' />
          </div>
        ))}
      </div>
      <div
        className='absolute w-[10%] h-[20%] top-0 bottom-0 right-0 m-auto cursor-pointer'
        onClick={() => handleArrow('right')}
      >
        <Image
          src='/img/arrowr.png'
          alt='arrow-right'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}

export default Featured
