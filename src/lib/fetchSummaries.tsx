import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
const _ = require('lodash');



import { options } from '@/app/api/auth/[...nextauth]/options';


const prisma = new PrismaClient();


export default async function fetchSummaries () {
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
    
    const filtered = summaries.map(summary => _.pick(summary, ['id', 'title', 'author', 'edition', 'pages', 'summary']))
  
    return filtered;

  } ;