import React from 'react'
import Wrapper from '@/components/Wrapper'
import { Slide } from 'react-slideshow-image'
import { aboutBannerImages } from '@/constants'
import psits_about_us from '../assets/aboutus.png'

const About = () => {
  return (
    <Wrapper title='PSITS | About Us'>
        <div className="my-10 mx-20 rounded">
            <Slide indicators>
            {aboutBannerImages.map((slideImage)=> (
                <div key={slideImage.name} className='flex justify-center rounded'>
                <img src={slideImage.banner} className='rounded'/>
                </div>
            ))} 
            </Slide>
        </div>
        <div className="my-10 bg-[#074873] text-white">
            <div className="grid grid-cols-2 justify-items-center mx-40">
                <div className="flex flex-col my-20">
                    <div className="text-2xl font-medium mb-8">
                        ABOUT US
                    </div>
                    <div className="text-base">
                        &emsp;
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quia fuga quidem non distinctio alias atque fugiat perspiciatis. Laborum rerum inventore quam optio nisi quia voluptates debitis suscipit unde repudiandae!
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur aliquid fugit labore delectus iste sequi beatae. Eum repudiandae ipsa voluptas molestiae ullam labore sapiente nemo laborum assumenda. Voluptatum, possimus id!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos vitae assumenda magnam veniam harum ab quae quisquam et magni possimus doloribus cumque blanditiis rerum, laboriosam cum incidunt quibusdam in alias!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam obcaecati fuga nemo, sequi fugiat quasi, sunt impedit, totam culpa facilis facere excepturi similique. Esse deserunt adipisci, nam excepturi sequi eius.
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src={psits_about_us} alt="PSITS Logo" />
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default About