import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
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
        >
            <header>
                <div>
                    Inside root layout
                    {/* <SignedIn>
                        <UserButton />
                    </SignedIn> */}
                    {/* <SignedOut>
                        <SignIn path="/sign-in" />
                    </SignedOut> */}
                </div>
            </header>
            <main>
                <Outlet />
            </main>

        </ClerkProvider>
    )
}

export default RootLayout