import { useQuery } from "@tanstack/react-query"
import { myEditablePlaylists } from "../utils/spotify"
import { SimplifiedPlaylist } from "../types/spotify"
import { Link } from "react-router-dom"
import { PageContainer } from "../components/Container"
import { Badge } from "../shadcn/components/ui/badge"
import { ListMusicIcon } from "lucide-react"
import { useAuth } from "../utils/auth"
import { LoggedOutPage } from "./LoggedOutPage"
import { Skeleton } from "../shadcn/components/ui/skeleton"

const loadingPlaylistArray = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

export const PlaylistsPage = () => {
    const { token, isLoggedIn, profile } = useAuth()

    const playlistsQuery = useQuery({
        queryKey: ['myEditablePlaylists'],
        queryFn: async () => await myEditablePlaylists(token!, profile?.id!),
        enabled: !!token && !!profile?.id
    })

    const playlists = playlistsQuery.data

    if (!isLoggedIn) {
        return <LoggedOutPage />
    }

    return (
        <PageContainer className="flex flex-col py-4 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-8 sm:gap-16 pb-6">
                {(playlistsQuery.isLoading ? loadingPlaylistArray : playlists)?.map(playlist => <PlaylistCard playlist={playlist} />)}
            </div>
        </PageContainer>
    )
}

type PlaylistCardProps = {
    playlist: SimplifiedPlaylist | undefined
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {

    if (!playlist) {
        return <Skeleton className="w-full aspect-square outline outline-1 outline-gray-200" />
    }

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
                    <h3 className="font-funky font-semibold text-md line-clamp-2">{playlist.name}</h3>
                    <div className="w-max">
                        <Badge variant="outline" className="text-gray-500 w-max">{playlist.tracks.total} track{playlist.tracks.total !== 1 && 's'}</Badge>
                    </div>
                </div>
            </div>
        </Link>
    )
}