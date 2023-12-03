
import { useQuery } from "@tanstack/react-query"
import { PlaylistInfo } from "../components/PlaylistEditor/PlaylistInfo"
import { PlaylistTracks } from "../components/PlaylistEditor/PlaylistTracks"
import { useParams } from "react-router-dom"
import { getPlaylist } from "../utils/spotify"
import { useContext } from "react"
import { SpotifyTokenContext } from "../App"
import { Container } from "../components/Container"



const IndexPage = () => {
    const token = useContext(SpotifyTokenContext)
    const { playlistId } = useParams()

    const playlistQuery = useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: async () => await getPlaylist({ token: token!, playlistId: playlistId! }),
        enabled: !!token && !!playlistId
    })

    const playlist = playlistQuery.data

    return (
        <div className="flex">
            <div className="flex flex-col flex-1 items-center h-[calc(100vh-130px)] overflow-scroll p-6">
                <Container className="flex flex-col">
                    {playlist ? (
                        <>
                            <PlaylistInfo playlist={playlist} />
                            <PlaylistTracks playlistId={playlistId!} />
                        </>
                    ) : (
                        <> no selected playlist</>
                    )}
                </Container>
            </div>

        </div>
    )
}

export default IndexPage