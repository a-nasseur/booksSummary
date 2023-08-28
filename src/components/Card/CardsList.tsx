'use client'

import { useSelector, useDispatch } from 'react-redux'
import { getAllSummaries } from '@/state/features/summarySlice'


import Card from "./Card"
import { RootState } from '@/state/store'
import { useEffect } from 'react'


export default function CardsList ({ data }: any) {
    const summaries = useSelector( (state: RootState) => state.summary.summaries)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSummaries(data));
    }, [])

    return (
        <>
            { summaries && 
                summaries.map((summary: Summary) => (
                <div key={summary.id}>
                    <Card 
                        id={summary.id}
                        title={summary.title}
                        author={summary.author}
                        pages={summary.pages}
                        edition={summary.edition}
                        summary={summary.summary}

                    />
                </div>
                ))
            }
            {
                !summaries && 
                <div className='h-screen w-full text-center flex justify-center items-center'>
                    <div>
                        <h1 className='text-2xl'>No summaries to show</h1>
                        <button className='btn btn-sm via-primary'>
                            <a href='/add-summary'>Add summary</a>
                        </button>
                    </div>
                </div>
            }
        
        </>
    )
}