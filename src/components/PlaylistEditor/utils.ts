import axios, { AxiosError } from "axios"
import { SeedData } from "./types"
import { SPOTIFY_BASE_API_URL, apiHeaders } from "../../utils/spotify"

type GetRecommendationsArgs = {
    token: string,
    seeds: SeedData[]
    onError?: (error: AxiosError) => void
}

export const getRecommendations = async ({ token, seeds, onError }: GetRecommendationsArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/recommendations`

    try {
        return (await axios.get(url, { 
            headers: apiHeaders(token), 
            params: { 
                seed_artists: seeds.filter(seed => seed.type === 'artist').map(seed => seed.value).join(','),
                seed_tracks: seeds.filter(seed => seed.type === 'track').map(seed => seed.value).join(','),
                seed_genres: seeds.filter(seed => seed.type === 'genre').map(seed => seed.value).join(','),
            }
        })).data
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

type GetGenreSeedsArgs = {
    token: string;
    onError?: (error: AxiosError) => void
}

export const getGenreSeeds = async ({ token, onError }: GetGenreSeedsArgs) => {
    if (!token) throw new Error('Not logged in!') 
    const url = `${SPOTIFY_BASE_API_URL}/v1/recommendations/available-genre-seeds`

    try {
        return (await axios.get(url, { headers: apiHeaders(token) })).data
    } catch (e) {
        if (e instanceof AxiosError) onError?.(e)
    }
}

export const getGenreDisplayName = (genre: string) => {
    const words = genre.split('-')

    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0)
        return firstLetter.toLocaleUpperCase() + word.slice(1)
    })

    return capitalizedWords.join(' ')
}