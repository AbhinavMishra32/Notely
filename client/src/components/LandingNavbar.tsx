import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingNavbar = () => {
    return (
        <div className='bg-neutral-950/40 border-b-[1px] border-neutral-800 backdrop-blur-xl w-full h-[74px] p-4 fixed z-50'>
            <div className='flex justify-between h-full items-center'>
                <div id='logo' className='bg-red-400'>Logo</div>
                <div id='navigation' className='flex gap-3'>
                    <div>Element 1</div>
                    <div>Element 2</div>
                    <div>Element 3</div>
                </div>
                <div id='account' className=''>
                    <Link to={'/sign-in'}>
                    <button className="relative inline-flex h-9 w-20 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Sign in
                        </span>
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingNavbar