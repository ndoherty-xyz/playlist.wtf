import { useQuery } from "@tanstack/react-query"
import { myEditablePlaylists } from "../utils/spotify"
import { useAuth } from "../utils/auth"
import { Popover, PopoverContent } from "@radix-ui/react-popover"
import { PopoverTrigger } from "../shadcn/components/ui/popover"
import { Button } from "../shadcn/components/ui/button"
import { ListMusicIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../shadcn/components/ui/command"
import { usePlayerHandlers } from "./Player/utils"
import { useToast } from "../shadcn/components/ui/use-toast"
import { useState } from "react"


type AddToPlaylistButtonProps = {
    trackURIToAdd: string | undefined
    disabled?: boolean
}

export const AddToPlaylistButton = ({ trackURIToAdd, disabled }: AddToPlaylistButtonProps) => {
    const { token, profile } = useAuth()
    const toast = useToast()

    const [open, setOpen] = useState(false)

    const { addToPlaylist } = usePlayerHandlers({
        onError() {
            toast.toast({
                variant: 'destructive',
                description: 'Something went wrong...',
                duration: 1000
            })
        }
    })

    const playlistsQuery = useQuery({
        queryKey: ['myEditablePlaylists'],
        queryFn: async () => await myEditablePlaylists(token!, profile?.id!),
        enabled: !!token && !!profile?.id
    })


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="ghost"
                    size="icon"
                    role="combobox"
                >
                    <ListMusicIcon size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={5}>
                <Command className="max-h-96 w-64 outline outline-1 outline-gray-200">
                    <CommandInput placeholder="Search for a playlist..." />
                    <CommandEmpty>No playlist found.</CommandEmpty>
                    <CommandGroup className="overflow-scroll" heading="Add to a playlist">
                        {playlistsQuery?.data?.map((playlist) => (
                            <CommandItem
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                content={playlist.name}
                                value={playlist.name}
                                onSelect={() => {
                                    if (trackURIToAdd) {
                                        addToPlaylist({ playlistId: playlist.id, trackURI: trackURIToAdd })
                                        setOpen(false)
                                    }
                                }}
                            >
                                {playlist.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )

}