import { useQuery } from "@tanstack/react-query"
import { me, myEditablePlaylists } from "../utils/spotify"
import { useContext } from "react"
import { SpotifyTokenContext } from "../App"
import { deepCamelCaseKeys } from "../constants"



const IndexPage = () => {
    const token = useContext(SpotifyTokenContext)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await me(token!)
            return deepCamelCaseKeys(data)
        },
        enabled: !!token
    })

    const playlistsQuery = useQuery({
        queryKey: ['myEditablePlaylists'],
        queryFn: async () => {
            const data = await myEditablePlaylists(token!, profileQuery.data.id)
            return deepCamelCaseKeys(data)
        },
        enabled: !!token && !!profileQuery?.data?.id
    })

    return <>
        {playlistsQuery.data.map((playlist: any) => playlist.name)}
    </>
}

export default IndexPage