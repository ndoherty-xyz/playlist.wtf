import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SpotifyLoginButton from './components/SpotifyLogin/SpotifyLogin';
import PlaylistDetailsPage from './pages/PlaylistDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { removeTokenFromLocalStorage, storeTokenInLocalStorage } from './utils/auth';
import { Toaster } from './shadcn/components/ui/toaster';
import { PlaylistsPage } from './pages/Playlists';
import { NavbarFooterLayout } from './pages/layouts/NavbarFooterLayout';

const queryClient = new QueryClient()

// Contexts to use across the app
export const SpotifyTokenContext = createContext<string | null>(null)
export const LogoutFnContext = createContext<(() => void) | undefined>(undefined)

function App() {
  const [token, setToken] = useState<string | null>(null)

  const logout = () => {
    setToken(null)
    removeTokenFromLocalStorage()
  }

  useEffect(() => {
    let loadedToken = window.localStorage.getItem("token")
    const hash = window.location.hash

    // If there's no token in localStorage, check the hash
    if (!loadedToken && hash) {
      loadedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? null

      if (loadedToken) {
        window.location.hash = ""
        storeTokenInLocalStorage(loadedToken)
      }
    }

    if (loadedToken) setToken(loadedToken)

    const scrollFunction = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", scrollFunction);
    window.addEventListener("beforeunload", scrollFunction);
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarFooterLayout><PlaylistsPage /></NavbarFooterLayout>,
    },
    {
      path: '/playlist/:playlistId',
      element: <NavbarFooterLayout><PlaylistDetailsPage /></NavbarFooterLayout>
    },
    {
      path: '/login',
      element: <SpotifyLoginButton />
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyTokenContext.Provider value={token}>
        <LogoutFnContext.Provider value={logout}>
          <div className='bg-gray-50 min-h-[100vh] overflow-hidden'>
            <RouterProvider router={router} />
            <Toaster />
          </div>
        </LogoutFnContext.Provider>
      </SpotifyTokenContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
