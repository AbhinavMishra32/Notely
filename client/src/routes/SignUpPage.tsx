import React, { useEffect } from 'react'
import Spline from '@splinetool/react-spline';
import { ArrowRightIcon } from 'lucide-react';
import { SignedIn, SignedOut, SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/home');
        }
    })
    return (
        <>
            <div className='flex items-center h-screen justify-center overflow-y-hidden bg-black'>
                <div className='flex flex-row gap-3 w-4/6 h-4/5 overflow-y-hidden bg-black
                rounded-3xl
                p-3
                '>
                    <div className='relative flex w-1/2 bg-black rounded-xl overflow-hidden'>
                        <div className='absolute rounded-xl shadow-[0_0_90px_10px_rgba(82,0,189,1)]'>

                        </div>
                        <Spline scene="https://prod.spline.design/sqFJBN7iWvh7fJtc/scene.splinecode" />
                    </div>
                    <div className='flex w-1/2 bg-black rounded-xl items-center justify-center'>
                        <SignedOut>
                            <SignUp path='/sign-up' afterSignOutUrl={'/home'} signInUrl='/sign-in' />
                        </SignedOut>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage