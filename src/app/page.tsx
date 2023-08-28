import Card from '@/components/Card/Card'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import CardsList from '@/components/Card/CardsList';
const _ = require('lodash');



const prisma = new PrismaClient();


const fetchSummaries = async () => {
    const session = await getServerSession(options)
    const summaries = await prisma.summary.findMany({
      where: {
        userId: session?.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    
    if(!summaries) throw new Error('Error while fetch data please try again');

    await prisma.$disconnect();

    const filteredSummary = summaries.map( summary => _.pick(summary, ['id', 'title', 'author', 'pages', 'summary']));

    return filteredSummary;

  } ;
    

export default async function Home() {
  const data: any = await fetchSummaries();

  return (
    <>
      <div className='md:grid md:grid-cols-3 md:gap-4 my-10 mx-6'> 
          <CardsList data={data}/>
          <ToastContainer />
      </div>
     
    </>
  )
}
