import React, { useEffect } from 'react'

const Wrapper = ({ children, title }: {children: React.ReactNode, title: string}) => {
  useEffect(() => {
    document.title = title; // Update the document title
  }, [title]);

  return (
    <section className='mx-20'>
      {children}
    </section>
  )
}

export default Wrapper;