import { useContext } from "react";
import { SpotifyTokenContext } from "../../App";
import { ProfileIndicator } from "./ProfileIndicator";
import SpotifyLoginButton from "../SpotifyLogin/SpotifyLogin";
import { Link } from "react-router-dom";


const Navbar = () => {
    const token = useContext(SpotifyTokenContext)

    return (
        <div className="w-full py-2 px-4 md:py-3 md:px-6 flex justify-between items-center border-b border-gray-200 bg-white">
            <Link to="/">
                <div className="flex gap-2 items-center">
                    <h2 className="text-base md:text-lg font-funky tracking-w font-semibold">playlist.wtf</h2>
                </div>
            </Link>

            {!!token ? <ProfileIndicator /> : <SpotifyLoginButton />}
        </div>
    )
}

export default Navbar