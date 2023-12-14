import axios, { AxiosError } from "axios"
import { SPOTIFY_BASE_API_URL, apiHeaders } from "../../utils/spotify";
import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlaybackStateResponse } from "../../types/spotify";


export const getPlaybackState = async (token: string): Promise<PlaybackStateResponse> => {
    if (!token) throw new Error('Not logged in!')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player`

    return (await axios.get( url, { headers: apiHeaders(token) } )).data
}

export const nextTrack = async (token: string, onError: (e: AxiosError) => void) => {
    if (!token) throw new Error('No token provided!');
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/next`


    try {
        return (await axios.post(url, {}, { headers: apiHeaders(token) })).data
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

export const previousTrack = async (token: string, onError: (e: AxiosError) => void) => {
    if (!token) throw new Error('No token provided!');
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/previous`

    try {
        return (await axios.post(url, {}, { headers: apiHeaders(token) })).data
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

type PlayTrackArgs = {
    token: string,
    trackUri: string,
    contextUri?: string,
    positionMs?: number,
    onError?: (error: AxiosError) => void
}

export const playTrack = async ({ token, trackUri, contextUri, positionMs, onError } : PlayTrackArgs) => {
    if (!token) throw new Error('Not logged in!')
    if (!trackUri) throw new Error('No track information supplied.')
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/play`

    let body: object = { uris: [trackUri] }
    if (contextUri)
        body = { context_uri: contextUri, offset: { uri: trackUri }}

    // Append position if given.
    if (positionMs)
        body = { ...body, position_ms: positionMs }

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

type ToggleShuffleArgs = {
    token: string,
    newShuffleState: boolean,
    onError?: (error: AxiosError) => void
}

export const toggleShuffle = async ({ token, newShuffleState, onError }: ToggleShuffleArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/shuffle`

    try {
        return (await axios.put(url, {}, { headers: apiHeaders(token), params: { state: newShuffleState } }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

type SkipArgs = {
    token: string;
    currentPos: number;
    onError?: (error: AxiosError) => void
}

export const skipAhead = async ({ token, currentPos, onError }: SkipArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/seek`

    try {
        return (await axios.put(url, {}, { headers: apiHeaders(token), params: { position_ms: currentPos + 10000 } }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

export const goBack = async ({ token, currentPos, onError }: SkipArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/me/player/seek`

    try {
        return (await axios.put(url, {}, { headers: apiHeaders(token), params: { position_ms: currentPos - 10000 } }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

type AddToPlaylistArgs = {
    token: string,
    playlistId: string,
    trackURI: string
    onError?: (error: AxiosError) => void
}

export const addToPlaylist = async ({ token, playlistId, trackURI, onError }: AddToPlaylistArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/playlists/${playlistId}/tracks`

    try {
        return (await axios.post(url, { uris: [trackURI], }, { headers: apiHeaders(token) }))
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}



type UsePlayerHandlersArgs = {
    onError: (e: AxiosError) => void
}

export const usePlayerHandlers = ({ onError }: UsePlayerHandlersArgs) => {
    const token = useContext(SpotifyTokenContext)
    const queryClient = useQueryClient()

    const currentlyPlaying = useQuery({
        queryKey: ['currentlyPlaying'],
        queryFn: async () => await getPlaybackState(token!),
        enabled: !!token,
        refetchInterval: 5000
    })

    const playTrackMutation = useMutation({
        mutationFn: ({ trackUri, contextUri }: { trackUri: string, contextUri?: string }) => {
            const positionToUse = currentlyPlaying.data?.item.uri === trackUri ? currentlyPlaying.data?.progress_ms : 0
            const contextUriToUse = contextUri ?? currentlyPlaying.data?.context.uri ?? undefined

            return playTrack({ token: token!, trackUri, onError: onError, positionMs: positionToUse, contextUri: contextUriToUse})
        },
        mutationKey: ['playTrack'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const pauseTrackMutation = useMutation({
        mutationFn: () => pauseTrack(token!, onError),
        mutationKey: ['pauseTrack'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const nextTrackMutation = useMutation({
        mutationFn: () => nextTrack(token!, onError),
        mutationKey: ['nextTrack'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const previousTrackMutation = useMutation({
        mutationFn: () => previousTrack(token!, onError),
        mutationKey: ['previousTrack'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const toggleShuffleMutation = useMutation({
        mutationFn: (newShuffleState: boolean) => toggleShuffle({ token: token!, newShuffleState, onError }),
        mutationKey: ['toggleShuffle'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const skipAheadMutation = useMutation({
        mutationFn: () => skipAhead({ token: token!, currentPos: currentlyPlaying.data?.progress_ms!, onError }),
        mutationKey: ['skipAhead'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })

    const goBackMutation = useMutation({
        mutationFn: () => goBack({ token: token!, currentPos: currentlyPlaying.data?.progress_ms!, onError }),
        mutationKey: ['skipAhead'],
        onSuccess() {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['currentlyPlaying'] }), 100)
        }
    })


    const addToPlaylistMutation = useMutation({
        mutationFn: ({playlistId, trackURI}: { playlistId: string, trackURI: string }) => addToPlaylist({ token: token!, playlistId, trackURI, onError }),
        mutationKey: ['addToPlaylist'],
        onSuccess(data, variables, context) {
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ['playlist', variables.playlistId] }), 100)
        }
    })

    return {
        currentlyPlaying: currentlyPlaying.data,
        playTrack: playTrackMutation.mutate,
        pauseTrack: pauseTrackMutation.mutate,
        nextTrack: nextTrackMutation.mutate,
        previousTrack: previousTrackMutation.mutate,
        changeShuffleState: toggleShuffleMutation.mutate,
        skipAhead: skipAheadMutation.mutate,
        goBack: goBackMutation.mutate,
        addToPlaylist: addToPlaylistMutation.mutate
    }
}