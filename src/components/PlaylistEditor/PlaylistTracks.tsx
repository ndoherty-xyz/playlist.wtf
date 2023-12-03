import { useInfiniteQuery } from "@tanstack/react-query"
import { playlistTracksById } from "../../utils/spotify";
import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { Button } from "../../shadcn/components/ui/button";
import { PlaylistTrack } from "../../types/spotify";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useToast } from "../../shadcn/components/ui/use-toast";
import { AxiosError } from "axios";
import { usePlayerHandlers } from "../Player/utils";


type PlaylistTracksProps = {
    playlistId: string;
}

export const PlaylistTracks = ({ playlistId }: PlaylistTracksProps) => {
    const token = useContext(SpotifyTokenContext)

    const tracksQuery = useInfiniteQuery({
        queryKey: ['tracks', playlistId],
        queryFn: async ({ pageParam }) => {
            return playlistTracksById(token!, playlistId, pageParam * 20)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages, lastPageParam) => {
            if (lastPage.total <= lastPage.offset + lastPage.limit) {
                return undefined
            }
            return lastPageParam + 1
        },
    })

    return <>
        <div className="flex flex-col gap-2">
            {tracksQuery.data?.pages.map(page => page.items.map((track: any) => (
                <TrackRow playlistTrack={track} playlistUri={`spotify:playlist:${playlistId}`} />
            )))}
            {tracksQuery.hasNextPage && <Button onClick={() => tracksQuery.fetchNextPage()}>Load more</Button>}
        </div>

    </>
}

type TrackRowProps = {
    playlistTrack: PlaylistTrack
    playlistUri: string
}

const TrackRow = ({ playlistTrack, playlistUri }: TrackRowProps) => {
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
                <img alt={`${playlistTrack.track.name} cover`} src={playlistTrack.track.album.images[0]?.url} width={55} height={55} className="rounded-sm object-cover aspect-square" />
                <div>
                    <h6 className="font-semibold">{playlistTrack.track.name}</h6>
                    <p className="text-sm text-gray-500">
                        {playlistTrack.track.artists.map(artist => artist.name).join(', ')}
                    </p>
                </div>
            </div>
            {currentlyPlaying?.item.uri === playlistTrack.track.uri ? (
                <Button size="icon" variant="outline" onClick={() => pauseTrack()}>
                    <PauseIcon size={20} />
                </Button>
            ) : (
                <Button size="icon" variant="outline" onClick={() => playTrack({ trackUri: playlistTrack.track.uri, contextUri: playlistUri })}>
                    <PlayIcon size={20} />
                </Button>
            )}
        </div>
    )
}