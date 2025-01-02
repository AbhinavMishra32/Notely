import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { isSignedIn, signOut } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/sign-in');
        }
    }, [isSignedIn]);

    return (
        <>
            <div>Home</div>
            <div>
                {user?.fullName}
            </div>
            <button onClick={() => signOut()}>
                Sign out
            </button>
        </>
    )
}

export default HomePage