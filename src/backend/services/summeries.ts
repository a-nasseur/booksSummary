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
    try {
        const summaries = await prisma.summary.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });

        const filteredSummary = summaries.map( summary => _.pick(summary, ['id', 'title', 'author', 'pages', 'summary']));

         // disconnecting db
         await prisma.$disconnect();

        return filteredSummary



    } catch (error) {
        // disconnecting db
        await prisma.$disconnect();
        throw error;
    }
   

}

const deleteSummaryService = async (id: string) => {
    const deleted = await prisma.summary.delete({
        where: {
            id: parseInt(id)
        }
    });

    return 'Summary deleted successfully';
}   

export { addSummaryService, getSummariesService, deleteSummaryService }