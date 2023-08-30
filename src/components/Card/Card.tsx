'use client';

// local imports
import { useEffect } from "react";
import { PrismaClient } from "@prisma/client";


import useApi from "@/hooks/useApi";
import { deleteSummary } from "@/state/features/summarySlice";
import DeleteButton from "./DeleteButton";
import { useDispatch } from "react-redux";
import summariesApi from "@/api/summeries";
import { toast } from "react-toastify";
import Link from "next/link";

const prisma = new PrismaClient();

export default function Card ({ id, title, author, pages, edition, summary }: Summary) {
    // dispatch store actions
    const dispatch = useDispatch();

    // useApi hook
    const { data, error, loading, request } = useApi(summariesApi.deleteSummary)

    // Handle delete api
    const handleDelete = async (id: number) => {
        request(id);

        if(error) console.log(error);

        dispatch(deleteSummary(id));
    };

    // tack data state
    // useEffect(() => {
    //     if(data?.success){
    //         toast.success('Deleted successfully');
    //     }
    //     if(!data?.success){
    //         toast.error('An error has occured, please try again later')
    //     }
    // }, [data])
   
    
    return (
        <div className="card w-full bg-base-100 shadow-xl mt-10 h-full">
            <div className="card-body font-bold">
                <div className="flex justify-between items-center">
                    <h2 className="card-title font-bold">{title}</h2>
                    <DeleteButton handleDelete={() => handleDelete(id)}/>
                </div>
                <h2 className='text-gray-500'>{author}</h2>
                <h4 className='text-gray-500'>{edition}</h4>
                <h6 className='text-gray-500'>{pages} pages</h6>
                <p>{summary.slice(0, 150)}...</p>
                <div className="card-actions mt-5">
                    <Link 
                        href={`/summaries/${id}`}
                        className="btn btn-primary btn-sm"
                    >
                            Read summary
                    </Link>
                </div>
            </div>
        </div>
        
    )
}