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

    return (await axios.get(url, { headers: apiHeaders(token) })).data ?? null
}

export const myEditablePlaylists = async (token: string, userId: string) => {
    console.log(token)
    console.log(userId)
    if (!token) throw new Error('Not logged in!')
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