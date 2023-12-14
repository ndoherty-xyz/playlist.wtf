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
            <div className="flex flex-col gap-2 pb-6">
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
        <div className="bg-white p-2 rounded-md flex gap-2 outline outline-2 outline-gray-100 items-center justify-between pr-4">
            <div className="flex gap-2 items-center">
                <img alt={`${track.name} cover`} src={track.album.images[0]?.url} width={55} height={55} className="rounded-sm object-cover aspect-square" />
                <div>
                    <h6 className="font-semibold font-funky text-sm">{track.name}</h6>
                    <p className="text-sm text-gray-500">
                        {track.artists.map(artist => artist.name).join(', ')}
                    </p>
                </div>
            </div>
            {currentlyPlaying?.item?.uri === track.uri ? (
                <Button size="icon" variant="outline" onClick={() => pauseTrack()}>
                    <PauseIcon size={20} />
                </Button>
            ) : (
                <Button size="icon" variant="outline" onClick={() => playTrack({ trackUri: track.uri, contextUri: playlistUri })}>
                    <PlayIcon size={20} />
                </Button>
            )}
        </div>
    )
}