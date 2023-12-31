import { PrismaClient } from '@prisma/client';
const _ = require('lodash');
import { getServerSession } from "next-auth/next";
import { options } from '@/app/api/auth/[...nextauth]/options';



const prisma = new PrismaClient();

const addSummaryService = async (data: Summary) => {
    // declaring userId var
    let userId;

    // get user from the session
    const session = await getServerSession(options);
    if(session){
        userId = session.user.id
    }
    const { title, author, pages, edition, summary } = data;

    try {
        // Creating new summary
        const newSummary = await prisma.summary.create({
            data: {
                title: title,
                author: author,
                pages: parseInt(pages),
                edition: edition,
                summary: summary,
                userId: userId
            }
        });

        const filteredSummary = _.pick(newSummary, [
            'id', 'title','edition', 'author', 'pages', 'summary'
        ]);

        // disconnecting db
        await prisma.$disconnect();

        return filteredSummary;

    } catch (error) {
        // disconnecting db
        await prisma.$disconnect();
        throw error;
    }
}

const getSummariesService = async () => {
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

}

const deleteSummaryService = async (id: string) => {
    try {
        const deleted = await prisma.summary.delete({
            where: {
                id: parseInt(id)
            }
        });
    
        return {
            success: true,
            message: 'Summary deleted successfully'
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'An error has occured, try again later'
        }
    }
}   

export { addSummaryService, getSummariesService, deleteSummaryService }