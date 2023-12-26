import { PropsWithChildren } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { PlayerFooter } from "../../components/Player/PlayerFooter";



export const NavbarFooterLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-screen h-screen">
            <Navbar />
            {children}
            <PlayerFooter />
        </div>
    )
}