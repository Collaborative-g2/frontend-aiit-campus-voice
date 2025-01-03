import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <div className="flex-grow">
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
};

export default Layout;