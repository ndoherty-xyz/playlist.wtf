import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { ProfileIndicator } from "./ProfileIndicator";
import SpotifyLoginButton from "../SpotifyLogin/SpotifyLogin";


const Navbar = () => {
    const token = useContext(SpotifyTokenContext)

    return (
        <div className="w-full py-3 px-6 flex justify-between items-center border-b border-gray-200 bg-white">
            playlist.wtf
            {!!token ? <ProfileIndicator /> : <SpotifyLoginButton />}
        </div>
    )
}

export default Navbar