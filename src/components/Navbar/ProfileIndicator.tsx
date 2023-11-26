import { SpotifyTokenContext } from "../../App"
import { deepCamelCaseKeys } from "../../constants"
import { AvatarFallback, AvatarImage } from "../../shadcn/components/ui/avatar"
import { Avatar } from "@radix-ui/react-avatar"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/components/ui/popover"
import { Button } from "../../shadcn/components/ui/button"
import { me } from "../../utils/spotify"


export const ProfileIndicator = () => {
    const token = useContext(SpotifyTokenContext)

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await me(token!)
            if (!data) return null
            return deepCamelCaseKeys(data)
        },
        enabled: !!token
    })


    return (
        <Popover>
            <PopoverTrigger>
                <Avatar className="block w-10 h-10 rounded-full hover:outline hover:outline-2 hover:outline-gray-100">
                    <AvatarImage className="rounded-full" src={profileQuery.data?.images?.[0].url} />
                    <AvatarFallback className="rounded-full">{profileQuery.data?.displayName?.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end">
                {profileQuery.data?.displayName}
                <Button variant="destructive">
                    Logout
                </Button>
            </PopoverContent>
        </Popover>
    )
}