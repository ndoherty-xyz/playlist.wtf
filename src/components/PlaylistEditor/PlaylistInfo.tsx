import { ListMusicIcon } from "lucide-react"
import { Badge } from "../../shadcn/components/ui/badge"
import { Playlist, PlaylistTrack } from "../../types/spotify"

type PlaylistInfoProps = {
    playlist: Playlist
    playlistTracks: PlaylistTrack[]
}

export const PlaylistInfo = ({ playlist, playlistTracks }: PlaylistInfoProps) => {

    const playlistDurationSeconds = playlistTracks.map(track => track.track.duration_ms).reduce((acc, duration) => (acc + duration), 0) / 1000
    const playlistDuration = () => {
        let seconds = Math.floor(playlistDurationSeconds)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)

        seconds = seconds % 60
        minutes = minutes % 60

        if (hours || minutes)
            return `${hours && `${hours} hour${hours !== 1 && 's'}`} ${minutes && `${minutes} minute${minutes !== 1 && 's'}`}`
        else
            return `${seconds} second${seconds !== 1 && 's'}`
    }

    return (
        <div className="flex flex-col gap-1 justify-center items-center mb-6 w-full">
            {!playlist.images[0]?.url ? (
                <div className="w-[250px] bg-gray-200/80 flex justify-center items-center rounded-xs object-cover aspect-square outline outline-2 outline-gray-200 mb-4">
                    <ListMusicIcon width="25%" height="25%" className="text-gray-500" />
                </div>
            ) : (
                <img alt={`${playlist.name} cover`} src={playlist.images[0]?.url} width={250} height={250} className="rounded-xs object-cover aspect-square outline outline-2 outline-gray-200 mb-4" />
            )}
            <h1 className="text-2xl font-semibold font-funky text-center">{playlist.name}</h1>
            <p className="text-gray-600 mb-2 text-center">{playlist.description}</p>
            <div className="flex gap-1">
                {playlist.collaborative && <Badge variant="default">Collaborative</Badge>}
                {playlist.public ? <Badge variant="default">Public</Badge> : <Badge variant="default">Private</Badge>}
                <Badge variant="default">{playlist.followers.total} follower{playlist.followers.total !== 1 && 's'}</Badge>
                <Badge variant="default">{playlistDuration()}</Badge>
            </div>
        </div>
    )
}