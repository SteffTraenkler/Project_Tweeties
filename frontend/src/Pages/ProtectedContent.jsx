import { Outlet } from "react-router-dom";
import { NavbarBottom } from "../Components/NavbarBottom";
import { NavbarMain } from "../Components/NavbarMain";


export default function ProtectedContent(props) {

    return (
        <div>

            <NavbarMain
                token={props.token} profileInfo={props.profileInfo}
            />

            <Outlet />
            <NavbarBottom />
        </div>
    )
}