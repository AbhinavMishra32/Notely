import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import { FlipWords } from '../components/ui/flip-words';
import {AnimatePresence, motion} from 'framer-motion';

const LandingPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    useEffect(() => {
        if (isSignedIn) {
            navigate('/app/home');
        }
    });
    return (
        <div className='flex flex-col bg-neutral-800 w-screen h-screen overflow-x-hidden'>
            <div className='h-[74px] w-full'>
                <LandingNavbar />
            </div>
            <div className='w-full h-full block bg-red-900'>
                <section className='flex flex-col bg-neutral-950 justify-center'>
                    <div className='text-center md:mt-48 mt-16'>
                        <div className='bg-gradient-to-b inline-block from-white to-neutral-400 bg-clip-text'>
                            <h1 className='text-transparent mx-4 md:text-8xl text-4xl text-center font-extrabold '>
                                Take Notes.
                            </h1>
                        </div>
                        <br />
                        <div className='bg-gradient-to-b inline-block from-white to-neutral-400 bg-clip-text'>
                            <h1 
                             className='text-transparent mx-4 md:mb-1 md:text-7xl text-4xl text-center font-extrabold '>
                                Organize Your <FlipWords words={['life.', 'ideas.', 'mind.']} duration={3000} className='' />
                            </h1>
                        </div>
                        <h3 className='text-center md:pt-2 pt-1 md:text-xl text-sm text-neutral-400'>
                            Never miss an idea again.
                        </h3>
                    </div>
                    {windowWidth > 768 ? (
                        <div className='h-fit w-[80vw] mx-auto mt-20 overflow-hidden rounded-3xl shadow-[0px_0px_300px_-5px_rgba(123,123,123,0.33)] relative'>
                            <img src={'../../public/landing.png'} alt='landing-page' className='w-full h-auto object-scale-down border-[2px] border-neutral-800 rounded-3xl' />
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900 rounded-3xl'></div>
                        </div>
                    ) : (
                        <div className='h-fit w-[400px] max-w-[90vw] mx-auto mt-10 overflow-hidden rounded-2xl shadow-[0px_0px_300px_-5px_rgba(123,123,123,0.33)] relative'>
                            <img src={'../../public/landing-mobile.png'} alt='landing-page' className='w-full h-full object-scale-down border-[1px] border-neutral-700 rounded-2xl' />
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-900 rounded-2xl'></div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default LandingPage