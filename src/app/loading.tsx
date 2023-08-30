'use client'

import Lottie from "lottie-react";
import Loading from '@/animations/loading-animation.json';

export default function loading () {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <h1 className="text-xl pr-2">Loading</h1><span className="loading loading-dots loading-md bg-primary"></span>
        </div>
    )
}