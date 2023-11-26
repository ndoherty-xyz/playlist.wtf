import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SpotifyLoginButton from './components/SpotifyLogin/SpotifyLogin';
import IndexPage from './pages';
import Navbar from './components/Navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { storeTokenInLocalStorage } from './utils/auth';

const queryClient = new QueryClient()
export const SpotifyTokenContext = createContext<string | null>(null)

function App() {
  const [token, setToken] = useState<string | null>(null)

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
      element: <IndexPage />,
    },
    {
      path: '/login',
      element: <SpotifyLoginButton />
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyTokenContext.Provider value={token}>
        <div className='bg-gray-50 min-h-[100vh]'>
          <Navbar />
          <RouterProvider router={router} />
        </div>
      </SpotifyTokenContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
