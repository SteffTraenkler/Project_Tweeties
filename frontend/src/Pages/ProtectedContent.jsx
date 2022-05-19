import { Outlet } from "react-router-dom";
import { NavbarMain } from "../Components/NavbarMain";


export default function ProtectedContent(props) {

    return (
        <div>
            <NavbarMain
                token={props.token}
            />
            <Outlet />
        </div>
    )
}