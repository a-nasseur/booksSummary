export declare global {
    interface Summary {
        id?: int;
        title: string;
        author: string;
        edition: string;
        pages: string;
        summary: string;
    }

    interface SummaryResponse {
        success: boolean;
        data: Summary[];
    }
}