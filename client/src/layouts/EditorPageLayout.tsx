import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import AIPanel from '../components/AIPanel';

const EditorPageLayout = () => {
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
        <div className='flex'>
            <Outlet />
            <AIPanel />
        </div>
    )
}

export default EditorPageLayout