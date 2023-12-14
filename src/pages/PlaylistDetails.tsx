
import { useQuery } from "@tanstack/react-query"
import { PlaylistInfo } from "../components/PlaylistEditor/PlaylistInfo"
import { PlaylistTracks } from "../components/PlaylistEditor/PlaylistTracks"
import { useParams } from "react-router-dom"
import { allPlaylistTracksById, getPlaylist } from "../utils/spotify"
import { PageContainer } from "../components/Container"
import { useAuth } from "../utils/auth"
import { LoggedOutPage } from "./LoggedOutPage"


const PlaylistDetailsPage = () => {
    const { token, isLoggedIn } = useAuth()
    const { playlistId } = useParams()

    const playlistQuery = useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: async () => await getPlaylist({ token: token!, playlistId: playlistId! }),
        enabled: !!token && !!playlistId
    })

    const tracksQuery = useQuery({
        queryKey: ['tracks', playlistId],
        queryFn: async () => {
            return await allPlaylistTracksById(token!, playlistId!)
        },
        enabled: !!token && !!playlistId
    })

    const playlist = playlistQuery.data

    if (!isLoggedIn) {
        return <LoggedOutPage />
    }

    return (
        <PageContainer className="flex flex-col py-12">
            {playlist ? (
                <>
                    <PlaylistInfo playlist={playlist} playlistTracks={tracksQuery.data ?? []} />
                    <PlaylistTracks tracks={tracksQuery.data ?? []} playlistId={playlistId!} />
                </>
            ) : (
                <> no selected playlist</>
            )}
        </PageContainer>
    )
}

export default PlaylistDetailsPage