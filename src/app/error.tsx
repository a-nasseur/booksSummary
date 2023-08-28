'use client';

export default function error () {
    return (
        <div className="flex justify-center items-center text-center h-screen">
            <div>
                <h1 className="text-red-400 text-2xl">An error happened while fetching data</h1>
                <h1 className="text-red-400 text-2xl">Please try again later</h1>
            </div>
        </div>
    )
};
