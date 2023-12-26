import { PageContainer } from "../components/Container"
import SpotifyLoginButton from "../components/SpotifyLogin/SpotifyLogin"



export const LoggedOutPage = () => {
    return (
        <PageContainer className="flex items-center justify-center flex-col">
            <h2 className="font-funky text-3xl font-semibold mb-2 text-center">Looks like you aren't logged in!</h2>
            <p className="text-gray-500 text-lg mb-6 text-center">You'll need to log into Spotify in order to edit your playlists</p>
            <SpotifyLoginButton />
        </PageContainer>
    )
}