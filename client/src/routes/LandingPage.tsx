import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/app/home');
        }
    });
    return (
        <div>LandingPage</div>
    )
}

export default LandingPage