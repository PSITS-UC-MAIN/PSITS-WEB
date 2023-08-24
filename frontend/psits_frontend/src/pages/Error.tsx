import Wrapper from '@/components/Wrapper'
import { notfound } from '@/assets'
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Button } from '@/components/ui/button';

const Error = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Wrapper title='PSITS | Page Not Found'>
      <div className='text-center flex items-center flex-col justify-center h-screen'>
        <img className="md:max-w-[600px] block mb-8" src={notfound} alt="not-found"/>
        <h3 className='text-xl md:text-3xl font-bold mb-4'>Ohh! Page Not Found</h3>
        <p className='text-gray-500 mb-2'>we can't seem to find the page you are looking for</p>
        <Link to="/" className=''>
          <Button variant="link" className='text-[#074873] text-lg'>Back Home</Button>
        </Link>
      </div>
    </Wrapper>
    )
  }

  return (
    <Wrapper title='PSITS | Page Not Found'>
      <div>
        <p>Something went wrong</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error