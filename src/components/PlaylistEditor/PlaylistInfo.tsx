import { ListMusicIcon } from "lucide-react"
import { Badge } from "../../shadcn/components/ui/badge"
import { SimplifiedPlaylist } from "../../types/spotify"

type PlaylistInfoProps = {
    playlist: SimplifiedPlaylist
}

export const PlaylistInfo = ({ playlist }: PlaylistInfoProps) => {
    return (
        <div className="flex flex-col gap-1 justify-center items-center mb-12 w-full">
            {!playlist.images[0]?.url ? (
                <div className="w-[250px] bg-gray-200/80 flex justify-center items-center rounded-xs object-cover aspect-square outline outline-2 outline-gray-200 mb-4">
                    <ListMusicIcon width="25%" height="25%" className="text-gray-500" />
                </div>
            ) : (
                <img alt={`${playlist.name} cover`} src={playlist.images[0]?.url} width={250} height={250} className="rounded-xs object-cover aspect-square outline outline-2 outline-gray-200 mb-4" />
            )}
            <h1 className="text-2xl font-semibold font-funky text-center">{playlist.name}</h1>
            <p className="text-gray-600 mb-2">{playlist.description}</p>
            <div className="flex gap-1">
                {playlist.collaborative && <Badge variant="default">Collaborative</Badge>}
                {playlist.public ? <Badge variant="default">Public</Badge> : <Badge variant="default">Private</Badge>}
            </div>
        </div>
    )
}