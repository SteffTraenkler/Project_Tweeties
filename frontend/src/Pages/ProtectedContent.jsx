import { Outlet } from "react-router-dom";
import { NavbarMain } from "../Components/NavbarMain";


export default function ProtectedContent(prop) {

    return (
        <div>
            <NavbarMain />
            <Outlet />
        </div>
    )
}