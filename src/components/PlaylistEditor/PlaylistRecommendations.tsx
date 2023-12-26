import { FileAudio2Icon, MusicIcon, Trash2Icon, UserCircle2Icon } from "lucide-react"
import { Button } from "../../shadcn/components/ui/button"
import { PlaylistTrack, Track } from "../../types/spotify"
import { RecommendationSeedsModal } from "./RecommendationSeedsModal"
import { SeedData } from "./types"
import { PlaylistTracks } from "./PlaylistTracks"

type PlaylistRecommendationsProps = {
    tracks: PlaylistTrack[]
    seeds: SeedData[]
    recommendations: Track[]
    addSeed: (seed: SeedData) => void
    removeSeed: (seedIndex: number) => void
    generateRecommendations: () => void;
}

export const PlaylistRecommendations = ({ tracks, seeds, addSeed, removeSeed, generateRecommendations, recommendations }: PlaylistRecommendationsProps) => {
    return (
        <>
            <div className="bg-white p-6 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div>
                        <h5 className="font-funky font-semibold text-lg">Recommendation Seeds</h5>
                        <p className="text-sm text-gray-500">Add up to 5 seeds for the recommendation engine to generate tracks from.</p>

                    </div>

                    <Button disabled={seeds.length === 0} onClick={generateRecommendations}>
                        Generate Recommendations
                    </Button>
                </div>

                <div className="flex gap-3 flex-wrap">
                    {
                        seeds.map((seed, index) => {
                            return (
                                <div className="bg-gray-100/50 w-fit px-4 py-2 pr-3 flex gap-8 max-w-full">
                                    <div className="flex gap-2.5 items-center">
                                        {
                                            seed.type === 'track' ? (
                                                <FileAudio2Icon size={20} />
                                            ) : seed.type === 'artist' ? (
                                                <UserCircle2Icon size={20} />
                                            ) : (
                                                <MusicIcon size={20} />
                                            )
                                        }
                                        <p className="font-medium text-md font-funky line-clamp-1">{seed.display}</p>
                                    </div>

                                    <Button variant="ghost" size="icon" onClick={() => removeSeed(index)}>
                                        <Trash2Icon className="text-red-600" size={20} />
                                    </Button>
                                </div>
                            )
                        })
                    }
                    {
                        seeds.length < 5 ? (
                            <RecommendationSeedsModal tracks={tracks} addSeed={addSeed} disabled={seeds.length >= 5} />
                        ) : null
                    }
                </div>
            </div>
            <div className="mt-4">
                <PlaylistTracks tracks={recommendations} />
            </div>
        </>
    )
}