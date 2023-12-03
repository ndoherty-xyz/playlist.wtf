import { useContext } from "react"
import { SpotifyTokenContext } from "../../App"
import { useQuery } from "@tanstack/react-query"
import { me, myEditablePlaylists } from "../../utils/spotify"
import { deepCamelCaseKeys } from "../../constants"
import { SimplifiedPlaylist } from "../../types/spotify"

type PlaylistSidebarProps = {
    selectedPlaylistId?: string
    selectPlaylist: (playlist: SimplifiedPlaylist) => void;
}

export const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({ selectedPlaylistId, selectPlaylist }) => {
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
            return await myEditablePlaylists(token!, profileQuery.data.id)
        },
        enabled: !!token && !!profileQuery?.data?.id
    })

    return (
        <div className="w-80 h-[calc(100vh-130px)] flex flex-col bg-white border-r border-gray-200">
            <div className="flex-1 overflow-scroll">
                {playlistsQuery.data?.map((playlist: SimplifiedPlaylist) => <PlaylistRow key={playlist.id} playlist={playlist} selected={playlist.id === selectedPlaylistId} selectPlaylist={selectPlaylist} />)}
            </div>
        </div>
    )
}

type PlaylistRowProps = {
    playlist: SimplifiedPlaylist
    selected?: boolean;
    selectPlaylist: (playlist: SimplifiedPlaylist) => void;
}

const PlaylistRow: React.FC<PlaylistRowProps> = ({ playlist, selected, selectPlaylist }) => {
    return (
        <div className={`flex items-center py-3 gap-2 px-6 border-b border-gray-100 ${selected ? 'bg-green-400' : 'hover:bg-gray-50'} cursor-pointer h-[65px]`}
            onClick={() => selectPlaylist(playlist)}>
            <img alt={`${playlist.name} cover`} src={playlist.images[0]?.url} width={40} height={40} className="rounded-sm object-cover aspect-square" />
            {playlist.name}
        </div>
    )
}