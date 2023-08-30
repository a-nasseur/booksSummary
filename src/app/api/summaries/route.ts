import { NextRequest, NextResponse } from "next/server";
import { addSummary, getSummaries, deleteSummary } from "@/backend/controllers/summaries";


export async function GET(request: NextRequest, response: NextRequest) {
    // controller
    const summaries = await getSummaries();

    // response
    const res = await NextResponse.json(summaries);

    return res 
}



export async function POST(request: NextRequest, response: NextResponse) {
    const summary = await addSummary(request, response);

    const res = await NextResponse.json(summary);


    return res;
}


export async function DELETE (request: NextRequest, response: NextResponse) {
    const deleted = await deleteSummary(request, response)

    const res = NextResponse.json(deleted);

    return res;

}