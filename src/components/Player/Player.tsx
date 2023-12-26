import { Button } from "../../shadcn/components/ui/button"
import { PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, StepBackIcon, StepForwardIcon } from "lucide-react"
import { useToast } from "../../shadcn/components/ui/use-toast"
import { usePlayerHandlers } from "./utils"
import { AddToPlaylistButton } from "../AddToPlaylistButton"
import { useWindowSize } from "../../utils/useWindowSize"



export const Player = () => {
    const toast = useToast()
    const windowSize = useWindowSize()

    const toastError = () => {
        toast.toast({
            variant: 'destructive',
            description: 'Something went wrong...',
            duration: 1000
        })
    }

    const {
        currentlyPlaying,
        playTrack,
        pauseTrack,
        nextTrack,
        previousTrack,
        changeShuffleState,
    } = usePlayerHandlers({
        onError: toastError
    })

    const isMobile = windowSize.width <= 768


    const track = currentlyPlaying?.item
    const trackActive = !!track
    const albumImageUrl = currentlyPlaying?.item?.album.images[0]?.url

    return (
        <div className="flex items-center gap-2 py-2 px-4 md:py-3 md:px-6 h-[57px] md:h-[65px] w-full justify-between">
            {trackActive ? (
                <div className="flex gap-2 items-center">
                    <img alt={`${track?.name} cover`} src={albumImageUrl} width={40} height={40} className={`${currentlyPlaying.is_playing ? 'animate-spin-slow rounded-full' : ''} object-cover aspect-square outline outline-1 outline-gray-100`} />
                    <div>
                        <p className="text-xs line-clamp-1 md:line-clamp-none md:text-sm font-funky font-semibold text-gray-800">{track.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">{track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>

                </div>
            ) : (
                <p className="font-funky">No active track</p>
            )}
            <div className="flex gap-2">


            </div>
            <div className="flex gap-2">
                {!isMobile ? (currentlyPlaying?.shuffle_state ? (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => changeShuffleState(false)}>
                        <ShuffleIcon size={20} className="text-green-500" />
                    </Button>
                ) : (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => changeShuffleState(true)}>
                        <ShuffleIcon size={20} className="text-gray-500" />
                    </Button>
                )) : null}
                {!isMobile ? (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => previousTrack()}>
                        <SkipBackIcon size={20} />
                    </Button>
                ) : null}
                {currentlyPlaying?.is_playing ? (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => pauseTrack()}>
                        <PauseIcon size={20} />
                    </Button>
                ) : (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => playTrack({ trackUri: track?.uri!, contextUri: currentlyPlaying?.context?.uri })}>
                        <PlayIcon size={20} />
                    </Button>
                )}
                {!isMobile ? (
                    <Button disabled={!trackActive} size="icon" variant="ghost" onClick={() => nextTrack()}>
                        <SkipForwardIcon size={20} />
                    </Button>
                ) : null}
                <AddToPlaylistButton disabled={!trackActive} trackURIToAdd={currentlyPlaying?.item?.uri} />
            </div>

        </div>
    )
}