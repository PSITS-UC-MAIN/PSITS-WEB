import React, { useEffect } from 'react'

const Wrapper = ({ children, title }: {children: React.ReactNode, title: string}) => {
  useEffect(() => {
    document.title = title; // Update the document title
  }, [title]);

  return (
    <>
    {children}
    </>
  )
}

export default Wrapper;