import { Button } from "../../shadcn/components/ui/button";
import { Track } from "../../types/spotify";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useToast } from "../../shadcn/components/ui/use-toast";
import { AxiosError } from "axios";
import { usePlayerHandlers } from "../Player/utils";


type PlaylistTracksProps = {
    playlistId?: string;
    tracks: Track[]
}

export const PlaylistTracks = ({ playlistId, tracks }: PlaylistTracksProps) => {
    return (
        <>
            <div className="flex flex-col pb-6">
                {tracks.map((track: Track) => (
                    <TrackRow track={track} playlistUri={!!playlistId ? `spotify:playlist:${playlistId}` : undefined} />
                ))}
            </div>
        </>
    )
}

type TrackRowProps = {
    track: Track
    playlistUri?: string
}

const TrackRow = ({ track, playlistUri }: TrackRowProps) => {
    const toast = useToast()

    const toastError = (error: AxiosError) => {
        let message = 'Something went wrong...'
        //@ts-expect-error
        if (error.response?.data?.error?.reason === 'NO_ACTIVE_DEVICE') message = 'No active Spotify device found.'
        toast.toast({ variant: "destructive", description: message, duration: 1500 })
    }

    const { playTrack, currentlyPlaying, pauseTrack } = usePlayerHandlers({ onError: toastError })

    return (
        <div className="px-1 py-4 md:px-6 flex gap-2  items-center justify-between  border-b border-gray-200/75 last:border-none">
            <div className="flex gap-4 items-center">
                <img alt={`${track.name} cover`} src={track.album.images[0]?.url} width={60} height={60} className="object-cover aspect-square outline outline-2 outline-gray-200/50" />
                <div>
                    <h6 className="font-semibold font-funky text-md">{track.name}</h6>
                    <p className="text-sm text-gray-600">
                        {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                </div>
            </div>
            {currentlyPlaying?.item?.uri === track.uri ? (
                <Button size="icon" variant="ghost" onClick={() => pauseTrack()}>
                    <PauseIcon size={20} />
                </Button>
            ) : (
                <Button size="icon" variant="ghost" onClick={() => playTrack({ trackUri: track.uri, contextUri: playlistUri })}>
                    <PlayIcon size={20} />
                </Button>
            )}
        </div>
    )
}