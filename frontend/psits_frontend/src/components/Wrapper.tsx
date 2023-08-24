import React, { useEffect } from 'react'

const Wrapper = ({ children, title }: {children: React.ReactNode, title: string}) => {
  useEffect(() => {
    document.title = title; // Update the document title
    window.scrollTo(0, 0); 
  }, [title]);

  return (
    <section className='mx-20'>
      {children}
    </section>
  )
}

export default Wrapper;