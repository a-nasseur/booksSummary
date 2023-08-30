import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
const _ = require('lodash');



import { options } from '@/app/api/auth/[...nextauth]/options';


const prisma = new PrismaClient();


export default async function fetchOneSummary (id: string) {
    const response  = await prisma.summary.findUnique({
      where: {
        id: parseInt(id)
      },
    });
    
    if(!response) throw new Error('Error while fetch data please try again');

    await prisma.$disconnect();
    
    const summary = _.pick(response, ['id', 'title', 'author', 'edition', 'pages', 'summary'])
  
    return summary;

  } ;