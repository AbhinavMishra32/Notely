import React, { useEffect } from 'react'
import Spline from '@splinetool/react-spline';
import { ArrowRightIcon } from 'lucide-react';
import { SignedIn, SignedOut, SignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const SignInPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/app/home');
        }
    })
    return (
        <>
            <div className="flex items-center min-h-screen justify-center overflow-hidden bg-gradient-to-b from-indigo-700/20 to-black">
                <div className="flex flex-col xl:flex-row justify-center items-center gap-6 w-11/12 lg:w-[90vw] lg:max-w-[60vw] lg:h-4/6 overflow-hidden lg:bg-black rounded-3xl shadow-lg p-8">

                    <div className="flex w-full lg:w-1/2 justify-center items-center lg:rounded-xl">
                        <div className='lg:mt-10'>
                            <SignedOut>
                                <SignIn path="/sign-in" afterSignOutUrl="/app/home" signUpUrl="/sign-up" />
                            </SignedOut>
                        </div>
                    </div>

                    <div className="relative flex lg:translate-y-0 -translate-y-14 justify-center items-center w-full lg:w-1/2 h-[300px] lg:h-full lg:max-h-[60vh] lg:rounded-xl overflow-hidden">
                        <Spline scene="https://prod.spline.design/sqFJBN7iWvh7fJtc/scene.splinecode" />
                    </div>
                </div>
            </div>
            <style>{`
            body {
                overflow: hidden;
            }
            `}</style>
        </>

    )
}

export default SignInPage