import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/root-layout.tsx'
import SignInPage from './routes/SignInPage.tsx'
import LandingPage from './routes/LandingPage.tsx'
import HomePageLayout from './layouts/HomePageLayout.tsx'
import EditorPageLayout from './layouts/EditorPageLayout'
import SignUpPage from './routes/SignUpPage.tsx'
import EditorPage from './routes/EditorPage.tsx'
import HomePage from './routes/HomePage.tsx'
import { SidebarProvider } from './contexts/SidebarContext.tsx';
import React from 'react'
import { Sidebar } from 'lucide-react'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        path: '/app', element:
          <SidebarProvider>
            <HomePageLayout />
          </SidebarProvider>
        ,
        children: [
          {
            path: 'home', element:
              <HomePage />
          },
          {
            path: 'note/*', element: <EditorPageLayout />,
            children: [
              { path: ':noteId', element: <EditorPage /> },
            ]
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
