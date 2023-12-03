import { PropsWithChildren } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { PlayerFooter } from "../../components/Player/PlayerFooter";



export const NavbarFooterLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <PlayerFooter />
        </>
    )
}