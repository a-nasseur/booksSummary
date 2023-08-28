'use client'

import Lottie from "lottie-react";
import Loading from '@/animations/loading-animation.json';

export default function loading () {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            {/* <Lottie animationData={Loading} /> */}
            <h1 className="text-3xl">Loading .....</h1>
        </div>
    )
}