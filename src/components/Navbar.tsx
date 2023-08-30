'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { searchSummary } from "@/state/features/summarySlice";
import { RootState } from "@/state/store";

export default function Navbar (): JSX.Element {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>('');
    const summaries = useSelector((state: RootState) => state.summary.summaries);
   

    useEffect(() => {
        dispatch(searchSummary(search));
    }, [search])    
    
    return (
        <>
            <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl">Books Summary</Link>
            </div>
            <div className="flex-none gap-2">
            <div className="form-control">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="input input-bordered w-24 md:w-auto" 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {
                        session?.user.image ? 
                        <Image 
                            src={session?.user.image}  
                            alt={`${session?.user.name} image`} 
                            width={64} 
                            height={64}
                        />
                        :
                        <span className="loading loading-ring loading-lg bg-primary"></span>
                    }
                </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Add summary
                    <span className="badge">New</span>
                    </a>
                </li>
                <li>
                    <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={() => signOut()}><a>Logout</a></li>
                </ul>
            </div>
            </div>
        </div>
        </>
    )
}