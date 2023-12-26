
import { useMutation, useQuery } from "@tanstack/react-query"
import { PlaylistInfo } from "../components/PlaylistEditor/PlaylistInfo"
import { PlaylistTracks } from "../components/PlaylistEditor/PlaylistTracks"
import { useParams } from "react-router-dom"
import { allPlaylistTracksById, getPlaylist } from "../utils/spotify"
import { PageContainer } from "../components/Container"
import { useAuth } from "../utils/auth"
import { LoggedOutPage } from "./LoggedOutPage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/components/ui/tabs"
import { PlaylistRecommendations } from "../components/PlaylistEditor/PlaylistRecommendations"
import { useCallback, useState } from "react"
import { SeedData } from "../components/PlaylistEditor/types"
import { getRecommendations } from "../components/PlaylistEditor/utils"
import { PlaylistTrack, Track } from "../types/spotify"
import { Loader2Icon } from "lucide-react"


const PlaylistDetailsPage = () => {
    const { token, isLoggedIn } = useAuth()
    const { playlistId } = useParams()
    const [activeSeeds, setActiveSeeds] = useState<SeedData[]>([])
    const [recommendations, setRecommendations] = useState<Track[]>([])
    const [recommendationsLoading, setRecommendationsLoading] = useState<boolean>(false)

    const playlistQuery = useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: async () => await getPlaylist({ token: token!, playlistId: playlistId! }),
        enabled: !!token && !!playlistId
    })

    const tracksQuery = useQuery({
        queryKey: ['tracks', playlistId],
        queryFn: async () => {
            return await allPlaylistTracksById(token!, playlistId!)
        },
        enabled: !!token && !!playlistId
    })

    const generateAndStoreRecommendations = useCallback(async () => {
        setRecommendationsLoading(true)
        const recommendations: { tracks: Track[] } = await getRecommendations({ token: token!, seeds: activeSeeds })
        setRecommendations(recommendations.tracks)
        setRecommendationsLoading(false)
    }, [activeSeeds, token])

    const removeSeed = (index: number) => {
        setActiveSeeds((current) => current.filter((_, filterIndex) => filterIndex !== index))
    }

    const playlist = playlistQuery.data

    if (!isLoggedIn) {
        return <LoggedOutPage />
    }

    if (!playlist && !playlistQuery.isLoading) {
        return (
            <PageContainer className="flex justify-center items-center">
                Uh oh!!! Playlist not found.
            </PageContainer>
        )
    }

    if (playlistQuery.isLoading) {
        return (
            <PageContainer className="flex justify-center items-center">
                <Loader2Icon className="animate-spin" size={24} />
            </PageContainer>
        )
    }

    return (
        <PageContainer className="flex flex-col py-6 md:py-12">
            <PlaylistInfo playlist={playlist!} playlistTracks={tracksQuery.data ?? []} />
            <Tabs defaultValue="tracks">
                <div className="flex justify-center mt-6 mb-4">
                    <TabsList className="rounded-b-none">
                        <TabsTrigger value="tracks">Playlist Tracks</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="tracks">
                    <PlaylistTracks tracks={tracksQuery.data?.map((playlistTrack: PlaylistTrack) => playlistTrack.track) ?? []} playlistId={playlistId!} />
                </TabsContent>
                <TabsContent value="recommendations">
                    <PlaylistRecommendations loading={recommendationsLoading} recommendations={recommendations} generateRecommendations={generateAndStoreRecommendations} removeSeed={removeSeed} tracks={tracksQuery.data ?? []} seeds={activeSeeds} addSeed={(seed) => setActiveSeeds((currentSeeds) => currentSeeds.concat(seed))} />
                </TabsContent>
            </Tabs>

        </PageContainer>
    )
}

export default PlaylistDetailsPage