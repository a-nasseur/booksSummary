import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


import CardsList from '@/components/Card/CardsList';
import Link from 'next/link';
import fetchSummaries from '@/lib/fetchSummaries';



export default async function Home() {
  const data: Summary[] = await fetchSummaries();

  return (
    <div className='h-screen'>
      <div className="hidden mt-4 md:block pl-6">
          <Link href="/add-summary" className="btn btn-md bg-primary text-white hover:text-black ">
              Add Summary
          </Link>
      </div>
      <div className='md:grid md:grid-cols-3 md:gap-4 my-10 mx-6'> 
          <CardsList data={data}/>
          <ToastContainer />
      </div>
    </div>
  )
}
