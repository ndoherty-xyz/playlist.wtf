import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { ProfileIndicator } from "./ProfileIndicator";
import SpotifyLoginButton from "../SpotifyLogin/SpotifyLogin";


const Navbar = () => {
    const token = useContext(SpotifyTokenContext)

    return (
        <div className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-200 bg-white">
            playlistNinjaV2
            {!!token ? <ProfileIndicator /> : <SpotifyLoginButton />}
        </div>
    )
}

export default Navbar