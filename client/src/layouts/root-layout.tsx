import { ClerkProvider, SignedIn, SignedOut, SignIn, useAuth, UserButton } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { Outlet, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable key");
}

const RootLayout = () => {
    const navigate = useNavigate();
    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => { navigate(to, { replace: true }) }}
            publishableKey={PUBLISHABLE_KEY}
            appearance={{ baseTheme: dark }}
        >
            <header>
                {/* Put header here */}
            </header>
            {/* <SignedOut>
            </SignedOut> */}
            <main>
                <Outlet />
            </main>

        </ClerkProvider>
    )
}

export default RootLayout