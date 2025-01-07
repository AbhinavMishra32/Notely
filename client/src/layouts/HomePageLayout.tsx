import { useAuth, useUser } from '@clerk/clerk-react'
import { Sheet } from '@mui/joy';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar, { SidebarGroup, SidebarItem } from '../components/Sidebar';
import { HelpCircle, HelpingHand, NotebookText, Search, Settings2 } from 'lucide-react';
import AIPanel from '../components/AIPanel';

const HomePageLayout = () => {
    const { isSignedIn, signOut } = useAuth();
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/sign-in');
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='flex gap-2'>
                <div className='sticky top-0 h-screen '>
                    <Sidebar>
                        <SidebarItem icon={<Search color='grey' size={17} />} link='/' text="Search" isNote={false} />
                        <SidebarGroup title='Notes'>
                            <SidebarItem icon={<NotebookText color='grey' size={17} />} link='/app/note/note-title-1-2qg3jl23gasdf' text='note title 1' isNote={true} />
                            <SidebarItem icon={<NotebookText color='grey' size={17} />} link='/app/note/helo-asem3wlk2fj2f23' text='helo' isNote={true} />
                            <SidebarItem icon={<NotebookText color='grey' size={17} />} link='/app/note/nice-note-asdfavbwmklvm32lk23k5' text='nice note' isNote={true} />
                        </SidebarGroup>

                        <SidebarGroup title="Settings">
                            <SidebarItem icon={<Settings2 color='gray' size={17} />} link='/settings' text='Settings' isNote={false} />
                            <SidebarItem icon={<HelpCircle color='gray' size={17} />} link='/help' text='Help' isNote={false} />
                        </SidebarGroup>
                    </Sidebar>
                </div>
                <div className='w-screen overflow-y-auto scrollbar-none bg-neutral-950'>
                    <Outlet />
                </div>
                {/* <AIPanel /> */}
            </div>
        </>
    )
}

export default HomePageLayout