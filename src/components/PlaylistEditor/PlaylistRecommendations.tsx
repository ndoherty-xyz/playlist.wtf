import { Trash2Icon } from "lucide-react"
import { Button } from "../../shadcn/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../shadcn/components/ui/card"
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
            <Card>
                <CardHeader className="flex justify-between flex-row items-start">
                    <div className="flex flex-col gap-1">
                        <CardTitle>Recommendation Seeds</CardTitle>
                        <CardDescription>Add up to 5 seeds for the recommendation engine to generate tracks from.</CardDescription>
                    </div>

                    <RecommendationSeedsModal tracks={tracks} addSeed={addSeed} disabled={seeds.length >= 5} />
                </CardHeader>
                <CardContent className="flex gap-3 flex-wrap">
                    {
                        seeds.map((seed, index) => {
                            return (
                                <div className="bg-gray-50 outline outline-gray-200 w-fit px-4 py-2 pr-2 rounded-md flex gap-8">
                                    <div className="flex flex-col gap-0">
                                        <h6 className="text-xs font-semibold text-gray-400">{seed.type.toUpperCase()}</h6>
                                        <p className="font-semibold text-md">{seed.display}</p>
                                    </div>

                                    <Button variant="ghost" size="icon" onClick={() => removeSeed(index)}>
                                        <Trash2Icon className="text-red-600" size={20} />
                                    </Button>
                                </div>
                            )
                        })
                    }
                </CardContent>
                <CardFooter className="justify-end">
                    <Button onClick={generateRecommendations}>
                        Generate Recommendations
                    </Button>
                </CardFooter>
            </Card>
            <div className="mt-4">
                <PlaylistTracks tracks={recommendations} />
            </div>
        </>
    )
}