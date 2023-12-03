import { useContext, useEffect } from "react"
import { LogoutFnContext, SpotifyTokenContext } from "../App"
import { me } from "./spotify"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const storeTokenInLocalStorage = (token: string) => {
    window.localStorage.setItem("token", token)
}

export const removeTokenFromLocalStorage = () => {
    window.localStorage.removeItem('token')
}

export const useAuth = () => {
    const token = useContext(SpotifyTokenContext)
    const logout = useContext(LogoutFnContext)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => await me(token!),
        enabled: !!token,
        refetchInterval: 5000
    })

    useEffect(() => {
        if (profileQuery.error && profileQuery.error instanceof AxiosError) {
            if (profileQuery.error.response?.status === 401) logout?.()
        }
    }, [profileQuery, logout])

    return {
        token,
        logout,
        isLoggedIn: !!token,
        profileLoading: profileQuery.isLoading,
        profile: profileQuery.data
    }
}