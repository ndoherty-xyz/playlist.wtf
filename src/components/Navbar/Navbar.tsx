import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { ProfileIndicator } from "./ProfileIndicator";
import SpotifyLoginButton from "../SpotifyLogin/SpotifyLogin";
import { Link } from "react-router-dom";


const Navbar = () => {
    const token = useContext(SpotifyTokenContext)

    return (
        <div className="w-full py-3 px-6 flex justify-between items-center border-b border-gray-200 bg-white">
            <Link to="/">
                <div className="flex gap-2 items-center">
                    <h2 className="font-semibold text-lg font-funky">PLAYLIST.WTF</h2>
                </div>
            </Link>

            {!!token ? <ProfileIndicator /> : <SpotifyLoginButton />}
        </div>
    )
}

export default Navbar