'use client'

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { redirect } from 'next/navigation'



// local imports
import summeriesApi from "@/api/summeries";
import useApi from "@/hooks/useApi";
import { useDispatch } from "react-redux";
import { addSummary } from "@/state/features/summarySlice";

// typing the form data
type FormData = {
    title: string;
    author: string;
    edition: string;
    pages: string;
    summary: string;

}

// Validation schema from YUP package
const validationSchema = yup.object({
    title: yup.string().required(),
    author: yup.string().required(),
    edition: yup.string().required(),
    pages: yup.string().matches(/[0-9]/gi, 'Required and needs to be a number').required(),
    summary: yup.string().required(),
});
 


export default function AddResume () {
    // Store dispatch hook
    const dispatch = useDispatch();

    // Fetch Hook
    const {data, request, error, loading} = useApi(summeriesApi.addSummary);

    // Form Data hook
    const { register, handleSubmit, reset, formState } = useForm<FormData>({
        defaultValues: {
            title: '',
            author: '',
            edition: '',
            pages: '',
            summary: ''
        },
        // Form hook resolvers using for validation schema with YUP
        resolver: yupResolver(validationSchema)
    });

    const { errors } = formState;

    // Form submit handler
    const onSubmit: SubmitHandler<FormData> = (values) => {
        // making the fetch request
        request(values);

        // checking for errors 
        if(error) console.error(error);
    }

    // Tracking the api response object
    useEffect(() => {
        if((data && data.success)){
            reset();
            toast.success('summary registered successfully');  
            dispatch(addSummary(data.data));
        } 
            if(data && !data.success){
            toast.error('An error happened during process try again later');
        }

        return () => {}
        
    }, [data]);



    return (
        
        <div className="my-10">
            <form onSubmit={handleSubmit(onSubmit)}>     
            <div className="card md:w-[750px] md:mx-auto mx-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Exemple: Dead poets society ..." 
                        className="input input-bordered" 
                        {...register('title')}
                    />
                    <p className="text-red-500 py-3">{errors.title?.message}</p>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>    
                    <input 
                        type="text" 
                        placeholder="Exemple: Umberto Eco..." 
                        className="input input-bordered" 
                        {...register('author')}
                    />
                    <p className="text-red-500 py-3">{errors.author?.message}</p>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Edition</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Exemple: Casbah.." 
                        className="input input-bordered" 
                        {...register('edition')}
                    />
                    <p className="text-red-500 py-3">{errors.edition?.message}</p>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Number of pages</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Exemple: 203..." 
                        className="input input-bordered" 
                        {...register('pages')}
                    />
                    <p className="text-red-500 py-3">{errors.pages?.message}</p>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Summary</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-24" 
                        placeholder="Enter you summmary here"
                        {...register('summary')}
                    ></textarea>
                    <p className="text-red-500 py-3">{errors.summary?.message}</p>
                </div>
                <div>
                    <button 
                        className="btn w-full max-w-xs mt-5"
                        type="submit"
                    >
                        {
                           loading ?

                                <Oval 
                                    height={22} 
                                    width={22} 
                                    color="black" 
                                    secondaryColor="black" 
                                />
                            :

                            "Submit"
                        }
                    </button>
                </div>
            </div>
            <ToastContainer />
            </form>
        </div>
    )
}