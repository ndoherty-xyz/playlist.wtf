import { TabsContent } from "@radix-ui/react-tabs"
import { Button } from "../../shadcn/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../shadcn/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/components/ui/tabs"
import { Artist, PlaylistTrack } from "../../types/spotify"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../shadcn/components/ui/command"
import { SeedData } from "./types"
import { useContext, useMemo, useState } from "react"
import { PlusIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getGenreDisplayName, getGenreSeeds } from "./utils"
import { SpotifyTokenContext } from "../../App"

type RecommendationSeedsModalProps = {
    tracks: PlaylistTrack[]
    addSeed: (seed: SeedData) => void
    disabled: boolean
}

export const RecommendationSeedsModal = ({ tracks, addSeed, disabled }: RecommendationSeedsModalProps) => {
    const token = useContext(SpotifyTokenContext)
    const [open, setOpen] = useState<boolean>(false)

    const genreSeedsQuery = useQuery({
        queryKey: ['availableGenres'],
        queryFn: async () => await getGenreSeeds({ token: token! })
    })

    const artistOptions: Artist[] = useMemo(() => {
        const allArtists = tracks.flatMap((playlistTrack) => playlistTrack.track.artists)
        const artistIdsNoDupes = Array.from(new Set(allArtists.map(artist => artist.id)))

        const artistOptions: Artist[] = artistIdsNoDupes.map((id) => allArtists.find((artist) => artist.id === id)).filter(Boolean) as Artist[]
        return artistOptions!
    }, [tracks])



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon" disabled={disabled} style={{ marginTop: 0 }} className="aspect-square h-[56px] w-[56px] bg-gray-100/50 rounded-none hover:bg-gray-100">
                    <PlusIcon size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-funky">Add Seeds</DialogTitle>
                    <DialogDescription>
                        Choose seeds for your track recommendations
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Tabs defaultValue="playlistTracks">
                        <TabsList className="w-full">
                            <TabsTrigger value="playlistTracks">Playlist Tracks</TabsTrigger>
                            <TabsTrigger value="playlistArtists">Playlist Artists</TabsTrigger>
                            <TabsTrigger value="genres">Genres</TabsTrigger>
                        </TabsList>
                        <TabsContent value="playlistTracks" className="pt-4">
                            <Command className="max-h-96 w-full outline outline-1 outline-gray-200">
                                <CommandInput placeholder="Search for a track in your playlist..." />
                                <CommandEmpty>No song found.</CommandEmpty>
                                <CommandGroup className="overflow-scroll">
                                    {tracks.map((playlistTrack) => (
                                        <CommandItem
                                            style={{ cursor: 'pointer' }}
                                            key={playlistTrack.track.id}
                                            content={playlistTrack.track.name}
                                            value={playlistTrack.track.name}
                                            onSelect={() => {
                                                addSeed({
                                                    type: 'track',
                                                    value: playlistTrack.track.id,
                                                    display: playlistTrack.track.name
                                                })
                                                setOpen(false)
                                            }}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <img alt={`${playlistTrack.track.name} cover`} src={playlistTrack.track.album.images[0]?.url} width={55} height={55} className="object-cover aspect-square" />
                                                <div>
                                                    <h6 className="font-semibold font-funky text-sm line-clamp-2">{playlistTrack.track.name}</h6>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {playlistTrack.track.artists.map(artist => artist.name).join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </TabsContent>
                        <TabsContent value="playlistArtists" className="pt-4">
                            <Command className="max-h-96 w-full outline outline-1 outline-gray-200">
                                <CommandInput placeholder="Search for an artist in your playlist..." />
                                <CommandEmpty>No artist found.</CommandEmpty>
                                <CommandGroup className="overflow-scroll">
                                    {artistOptions.map((artist) => (
                                        <CommandItem
                                            style={{ cursor: 'pointer' }}
                                            key={artist.id}
                                            content={artist.name}
                                            value={artist.name}
                                            onSelect={() => {
                                                addSeed({
                                                    type: 'artist',
                                                    value: artist.id,
                                                    display: artist.name
                                                })
                                                setOpen(false)
                                            }}
                                        >
                                            <h6 className="font-semibold text-sm">{artist.name}</h6>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </TabsContent>
                        <TabsContent value="genres" className="pt-4">
                            <Command className="max-h-96 w-full outline outline-1 outline-gray-200">
                                <CommandInput placeholder="Search for an genre..." />
                                <CommandEmpty>No genre found.</CommandEmpty>
                                <CommandGroup className="overflow-scroll">
                                    {genreSeedsQuery.data?.genres?.map((genre: string) => (
                                        <CommandItem
                                            style={{ cursor: 'pointer' }}
                                            key={genre}
                                            content={genre}
                                            value={genre}
                                            onSelect={() => {
                                                addSeed({
                                                    type: 'genre',
                                                    value: genre,
                                                    display: getGenreDisplayName(genre)
                                                })
                                                setOpen(false)
                                            }}
                                        >
                                            <h6 className="font-semibold text-sm">{getGenreDisplayName(genre)}</h6>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}