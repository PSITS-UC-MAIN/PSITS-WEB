import React from 'react'
import Wrapper from '@/components/Wrapper'
import { Slide } from 'react-slideshow-image'
import { homeBannerImages } from '@/constants'
import { psits_banner2 } from '@/assets'

const dummyData = [
    {
        id: 1,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers"
    },
    {
        id: 2,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers"
    },
    {
        id: 3,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers"
    },
]

const Events = () => {
  return (
    <Wrapper title='PSITS | Events' className='mx-20'>
        <div className="my-10">
            <Slide indicators>
                {homeBannerImages.map((slideImage)=> (
                <div key={slideImage.name} className='flex items-center justify-center rounded h-[600px] bg-cover bg-center' style={{'backgroundImage': `url(${slideImage.banner})`}} />
                ))} 
            </Slide>
        </div>
        <div className="flex flex-col gap-y-10 mx-20 mb-20">
            <div className='text-2xl font-medium text-center text-white bg-[#548BA1] p-5 rounded-md'>
                COLLEGE OF COMPUTER STUDIES LIST OF EVENTS
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-5">
                {dummyData.map(item => (
                    <div key={item.id}>
                        <div className='flex flex-row bg-[#E6F1F5] text-black items-center rounded-md'>
                            <div className='me-5'>
                                <img className='h-[250px] rounded-s-md' src={item.photo_img_link} alt="Event Image" />
                            </div>
                            <div className='flex flex-col gap-y-5'>
                                <div className='text-xl font-bold'>
                                    {item.title}
                                </div>
                                <div className='text-base font-normal'>
                                    {item.content}
                                </div>
                                <div className='text-base font-medium text-[#5390AB]'>
                                    {item.eventDate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Wrapper>
  )
}

export default Events