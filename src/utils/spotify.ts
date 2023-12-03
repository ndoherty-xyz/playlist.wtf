import axios, { AxiosError } from "axios"
import { CurrentlyPlayingResponse, SimplifiedPlaylist } from "../types/spotify"

export const SPOTIFY_BASE_API_URL = 'https://api.spotify.com'

export const apiHeaders = (token: string) => {
    return {
        'Content-Type' : "application/json",
        'Authorization': `Bearer ${token}`
    }
}

export const me = async (token: string) => {
    if (!token) throw new Error('Not logged in!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me`

    return (await axios.get(url, { headers: apiHeaders(token) })).data ?? null
}

export const myEditablePlaylists = async (token: string, userId: string): Promise<SimplifiedPlaylist[]> => {
    if (!token) throw new Error('Not logged in!')
    if (!userId) throw new Error('No userId to filter by!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/playlists`

    const firstCall = (await axios.get(url, { headers: apiHeaders(token), params: { limit: 50, offset: 0 } })).data
    let playlists = firstCall.items
    let allPlaylistsLoaded = !firstCall.next

    if (!allPlaylistsLoaded) {
        let offset = 50;

        while (!allPlaylistsLoaded) {
            const loadMoreCall = (await axios.get(url, { headers: apiHeaders(token), params: { limit: 50, offset } })).data

            offset += 50;
    
            playlists = playlists.concat(
              loadMoreCall.items
            );

            if (!loadMoreCall.next) {
                allPlaylistsLoaded = true
            }
        }
    }

    return playlists.filter((playlist: any) => {
        return playlist.owner.id === userId || playlist.collaborative;
      });
}

export const playlistTracksById = async (token: string, playlistId: string, offset: number) => {
    if (!token) throw new Error('Not logged in!')
    if (!playlistId) throw new Error('No userId to filter by!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/playlists/${playlistId}/tracks`

    return (await axios.get(url, { headers: apiHeaders(token), params: {limit: 20, offset} })).data ?? null
}


export const playTrack = async (token: string, trackUri: string, playlistId?: string, onError?: (error: AxiosError) => void) => {
    if (!token) throw new Error('Not logged in!')
    if (!trackUri) throw new Error('No track information supplied.')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/play`

    let body: any = { uris: [trackUri] }
    if (playlistId)
        body = { context_uri: `spotify:playlist:${playlistId}`, offset: { uri: trackUri }}

    try {
        return (await axios.put(url, body, { headers: apiHeaders(token) }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

export const pauseTrack = async (token: string, onError?: (error: AxiosError) => void) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/pause`

    try {
        return (await axios.put(url, {}, { headers: apiHeaders(token) }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

export const getCurrentlyPlayingTrack = async (token: string): Promise<CurrentlyPlayingResponse> => {
    if (!token) throw new Error('Not logged in!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/currently-playing`

    return (await axios.get( url, { headers: apiHeaders(token) } )).data
}

type GetPlaylistArgs = {
    token: string,
    playlistId: string;
}

export const getPlaylist = async ({ token, playlistId }: GetPlaylistArgs): Promise<SimplifiedPlaylist> => {
    if (!token) throw new Error('Not logged in!')
    if (!playlistId) throw new Error('No playlist id given!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/playlists/${playlistId}`

    return (await axios.get( url, { headers: apiHeaders(token) } )).data
}