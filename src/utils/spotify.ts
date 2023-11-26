import axios from "axios"

const SPOTIFY_BASE_API_URL = 'https://api.spotify.com'

const apiHeaders = (token: string) => {
    return {
        'Content-Type' : "application/json",
        'Authorization': `Bearer ${token}`
    }
}

export const me = async (token: string) => {
    if (!token) throw new Error('Not logged in!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me`

    return (await axios.get(url, { headers: apiHeaders(token) })).data
}