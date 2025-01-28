import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import { FlipWords } from '../components/ui/flip-words';
import {AnimatePresence, motion} from 'framer-motion';
import LandingImage from '../assets/landing.png';
import LandingImageMobile from '../assets/landing-mobile.png';
import { BellIcon, CalendarIcon, DivideSquare, FileTextIcon, Globe, GlobeIcon, Laptop, Search, Star, StarsIcon, Text, TextCursor } from 'lucide-react';
import { BentoCard, BentoGrid } from '../components/ui/bento-grid';
import { InputIcon, TextIcon } from '@radix-ui/react-icons';

const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "Save your files to the cloud and access them from anywhere.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: StarsIcon,
      name: "Use AI to ask questions about your notes",
      description: "Using AI, you can ask questions about your notes and get answers.",
      href: "/",
      cta: "Learn more",
      background: <img src={LandingImage} className="absolute -right-20 -top-20 opacity-60 object-contain" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Laptop,
      name: "Beautiful UI",
      description: "Our UI is designed to be simple and easy to use.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: TextIcon,
      name: "Rich text editor",
      description: "Our rich text editor allows you to format your notes however you like.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Globe,
      name: "Access from any device",
      description:
        "Access your files from any device, including your phone.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];


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
        <div className='flex flex-col bg-neutral-500 w-screen h-screen overflow-x-hidden'>
            <div className='h-[74px] w-full'>
                <LandingNavbar />
            </div>
            <div className='w-full h-full block bg-neutral-950'>
                <section className='flex flex-col bg-neutral-950 justify-center mt-14 md:mt-0'>
                    <div className="text-center md:mt-48 mt-16 font-['dm_serif_display']">
                        <div className='bg-gradient-to-b inline-block from-white to-neutral-400 bg-clip-text'>
                            <h1 className='text-transparent mx-4 md:text-8xl text-4xl text-center font-extrabold '>
                                Take Notes.
                            </h1>
                        </div>
                        <br />
                        <div className='bg-gradient-to-b inline-block from-white to-neutral-400 bg-clip-text'>
                            <h1 
                             className='text-transparent mx-4 md:mb-2 md:text-7xl text-3xl text-center font-extrabold '>
                                Organize Your <FlipWords words={['life.', 'ideas.', 'mind.']} duration={3000} className='' />
                            </h1>
                        </div>
                        <h3 className='text-center md:pt-2 pt-1 md:text-xl text-sm text-neutral-400'>
                            Never miss an idea again.
                        </h3>
                        <Link to="/sign-in">
                        <div className="mt-8 bg-neutral-900 border-2 border-neutral-700 inline-block px-5 py-2 rounded-full font-sans hover:font-['dm_serif_display'] hover:px-6 hover:bg-gradient-to-b hover:from-neutral-200 hover:to-neutral-300 hover:text-black hover:shadow-inner hover:shadow-neutral-400">Get Started</div>
                        </Link>
                    </div>
                    {windowWidth > 768 ? (
                        <div className='h-fit w-[80vw] mx-auto mt-14 overflow-hidden rounded-3xl shadow-[0px_-100px_300px_-40px_rgba(93,93,93,0.23)] relative'>
                            <img src={LandingImage} alt='landing-page' className='w-full h-auto object-scale-down border-[2px] border-neutral-800 rounded-3xl' />
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-950 rounded-3xl'></div>
                        </div>
                    ) : (
                        <div className='h-fit w-[400px] max-w-[90vw] mx-auto mt-10 overflow-hidden rounded-2xl shadow-[0px_-50px_100px_-10px_rgba(93,93,93,0.23)] relative'>
                            <img src={LandingImageMobile} alt='landing-page' className='w-full h-full object-scale-down border-[1px] border-neutral-700 rounded-2xl' />
                            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-950 rounded-2xl'></div>
                        </div>
                    )}
                </section>
                <section>
                    <div className='w-full h-fit py-10 bg-neutral-950'>
                        <div className='w-[80vw] h-full bg-neutral-950 mx-auto'>
                            <BentoGrid className='lg:grid-rows-3 h-full'>
                                {features.map((feature) => (
                                    <BentoCard key={feature.name} {...feature} />
                                ))}
                            </BentoGrid>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LandingPage