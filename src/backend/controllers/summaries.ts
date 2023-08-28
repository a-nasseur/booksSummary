import { NextRequest, NextResponse } from "next/server";
import { validateSummary } from "../lib/validation";
import { addSummaryService, getSummariesService } from "../services/summeries";


const addSummary = async (request: NextRequest, response: Response) => {
    const body = await request.json();

    // Validate User 
    const { error } = validateSummary(body);

    // Return Error
    if(error){
        return {
            success: false,
            message: error.details[0].message
        }
    }

    const summary = await addSummaryService(body);


    return {
        success: true,
        data: summary
    };
}

const getSummaries = async () => {
    const summaries = await getSummariesService();

    return {
        success: true,
        data: summaries
    };
}

const deleteSummary = async (request: NextRequest, response: Response) => {
    const body = await request.json()

    return body;
}

export { addSummary, getSummaries, deleteSummary }