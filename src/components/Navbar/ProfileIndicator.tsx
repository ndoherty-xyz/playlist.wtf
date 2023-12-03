import { AvatarFallback, AvatarImage } from "../../shadcn/components/ui/avatar"
import { Avatar } from "@radix-ui/react-avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/components/ui/popover"
import { Button } from "../../shadcn/components/ui/button"
import { Skeleton } from "../../shadcn/components/ui/skeleton"
import { useAuth } from "../../utils/auth"


export const ProfileIndicator = () => {
    const { logout, profile, profileLoading } = useAuth()

    if (profileLoading) {
        return <Skeleton className="w-10 h-10 rounded-full" />
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar className="block w-10 h-10 rounded-full hover:outline hover:outline-2 hover:outline-gray-100">
                    <AvatarImage className="rounded-full" src={profile?.images?.[0].url} />
                    <AvatarFallback className="rounded-full">{profile?.display_name.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end">
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex gap-2 items-center w-full">
                        <Avatar className="block w-10 h-10 rounded-full">
                            <AvatarImage className="rounded-full" src={profile?.images?.[0].url} />
                            <AvatarFallback className="rounded-full">{profile?.display_name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-funky font-semibold text-sm">{profile?.display_name}</h4>
                            <p className="text-gray-500 text-xs">{profile?.followers.total} followers</p>
                        </div>

                    </div>

                    {logout && <Button variant="outline" className="w-full text-red-400 border-red-400 hover:text-red-600 hover:border-red-600 hover:bg-red-100" onClick={logout}>
                        Logout
                    </Button>}
                </div>
            </PopoverContent>
        </Popover>
    )
}