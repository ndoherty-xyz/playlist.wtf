import axios, { AxiosError } from "axios";
import { removeTokenFromLocalStorage } from "../utils/auth";

const SPOTIFY_BASE_API_URL = 'https://api.spotify.com'

export default class SpotifyService {
    private apiHeaders = (token: string) => {
        return {
            'Content-Type' : "application/json",
            'Authorization': `Bearer ${token}`
        }
    }

    private sessionCheckWrapper = async ( fn: Function ) => {
        try {
            return await fn()
        } catch (e: any) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                   // TODO HANDLE UNAUTHORIZED RESPONSE
                }
            }
            return null
        }
    }


    public async me(token: string) {
        if (!token) throw new Error('Not logged in!')
        const url = `${SPOTIFY_BASE_API_URL}/v1/me`

        return this.sessionCheckWrapper(async () => (await axios.get(url, { headers: this.apiHeaders(token) })).data)
    }
}