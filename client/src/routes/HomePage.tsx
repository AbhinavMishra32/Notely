import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/sign-in');
        }
    })
    return (
        <>
            <div>Home</div>
            <div>
                {user?.fullName}
            </div>
        </>
    )
}

export default HomePage