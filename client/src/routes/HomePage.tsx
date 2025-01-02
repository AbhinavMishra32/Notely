import { useAuth, useUser } from '@clerk/clerk-react'
import { Sheet } from '@mui/joy';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar, { SidebarGroup, SidebarItem } from '../components/Sidebar';
import { LucideStickyNote, MoveRight, NotebookIcon, NotebookPen, NotebookPenIcon, NotebookTabs, NotebookText, Text } from 'lucide-react';

const HomePage = () => {
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
            <div className='flex'>
                <Sidebar>
                    <SidebarGroup title='Hello'>
                        <SidebarItem icon={<NotebookText color='grey' size={17} />} link='/eee' text='note title 1' />
                    </SidebarGroup>
                </Sidebar>
                <div className='h-screen w-screen dark:bg-black dark:text-white font-inter'>
                    <div className='font-inter'>Home</div>
                    <div>
                        {user?.fullName}
                    </div>
                    <button onClick={() => signOut()}>
                        Sign out
                    </button>
                </div>
            </div>
        </>
    )
}

export default HomePage