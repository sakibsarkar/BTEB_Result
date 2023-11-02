import Nav from "./Nav/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Nav></Nav>
            <Outlet></Outlet>
        </>
    );
};

export default Layout;