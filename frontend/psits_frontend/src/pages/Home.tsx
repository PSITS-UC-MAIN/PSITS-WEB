import axios from 'axios';
import { useState, useEffect } from 'react';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Wrapper from '@/components/Wrapper';

import { homeBannerImages } from '@/constants';

interface Announcements {
  id: number;
  title: string;
  creationDate: Date;
  author: number;
  content: string;
  photo_img_links: string;
}

const Home = () => {
  const [announcements, setAnnouncements] = useState<Announcements[]>([
    {
      id: 1234,
      title: "Test",
      creationDate: new Date,
      author: 1234,
      content: "hello sup",
      photo_img_links: 'dennis'
    }
  ]);

  // useEffect(() => {
  //   const getAnnouncements = async () => {
  //     try {
  //       const response = await axios.get('https://psits-uc-main-api.onrender.com/api/announcement')
  //       console.log(response.data)   
  //     } catch (error: any) {
  //       throw new Error(error)
  //     }
  //   };

  //   getAnnouncements();
  // }, [])


  return (
    <Wrapper title='PSITS | Home'>
      <div className='my-10 rounded'>
        <Slide indicators>
          {homeBannerImages.map((slideImage)=> (
            <div key={slideImage.name} className='flex justify-center rounded'>
              <img src={slideImage.banner} className='rounded'/>
            </div>
          ))} 
        </Slide>
      </div>
      <div className='my-10 flex justify-center gap-4'>
        <div className='bg-[#e8eef1] p-4 rounded-lg'>
          <h1 className='text-center font-bold text-2xl mb-4'>Upcoming Events</h1>
          <Card className='w-[300px]'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className='w-[60%] bg-[#d3e7f5] rounded p-4'>
          <h1 className='text-center font-bold text-3xl mb-4'>Announcements</h1>
          <div className='flex justify-center'>
            {announcements.map(announcement => {
              return (
                <Card className='w-[90%]' key={announcement.id}>
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                  <CardFooter>
                    <p>{announcement.creationDate.toISOString()}</p>
                  </CardFooter>
                </Card>
              )
            })}
            </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home