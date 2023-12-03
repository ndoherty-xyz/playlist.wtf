import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { me, myEditablePlaylists } from "../utils/spotify"
import { SpotifyTokenContext } from "../App"
import { SimplifiedPlaylist } from "../types/spotify"
import { Link } from "react-router-dom"
import { Container } from "../components/Container"
import { Badge } from "../shadcn/components/ui/badge"
import { ListMusicIcon } from "lucide-react"


export const PlaylistsPage = () => {
    const token = useContext(SpotifyTokenContext)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => await me(token!),
        enabled: !!token
    })

    const playlistsQuery = useQuery({
        queryKey: ['myEditablePlaylists'],
        queryFn: async () => await myEditablePlaylists(token!, profileQuery.data.id),
        enabled: !!token && !!profileQuery?.data?.id
    })

    const playlists = playlistsQuery.data

    return (
        <div className="h-[calc(100vh-130px)] flex flex-col items-center p-16 overflow-scroll">
            <Container>
                <div className="grid grid-cols-4 w-full gap-16">
                    {playlists?.map(playlist => <PlaylistCard playlist={playlist} />)}
                </div>
            </Container>
        </div>
    )
}

type PlaylistCardProps = {
    playlist: SimplifiedPlaylist
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {

    return (
        <Link to={`/playlist/${playlist.id}`}>
            <div className="flex flex-col gap-4 cursor-pointer group">
                {!playlist.images[0]?.url ? (
                    <div className="w-full aspect-square bg-gray-200/80 flex justify-center items-center outline outline-2 outline-gray-100  group-hover:outline-gray-200 group-hover:outline-4 transition-all">
                        <ListMusicIcon width="25%" height="25%" className="text-gray-500" />
                    </div>
                ) : (
                    <img alt={`${playlist.name} cover`} src={playlist.images[0]?.url} className="rounded-xs w-full object-cover aspect-square outline outline-2 outline-gray-100  group-hover:outline-gray-200 group-hover:outline-4 transition-all" />
                )}
                <div className="flex justify-between gap-4">
                    <h3 className="font-funky font-semibold text-base line-clamp-2">{playlist.name}</h3>
                    <div className="w-max">
                        <Badge variant="outline" className="text-gray-500 w-max">{playlist.tracks.total} tracks</Badge>
                    </div>
                </div>
            </div>
        </Link>
    )
}