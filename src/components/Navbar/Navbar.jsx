import {Link, useLocation} from "react-router-dom";
import ProjectLogo from "../../assets/project-logo.svg"
import {HashLink} from "react-router-hash-link";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <div className="sticky top-0 right-0 w-full bg-white text-black shadow-md z-[1]">
                <div className="container py-3 sm:py-0">
                    <div className="flex justify-between items-center">
                        {/* Project logo section */}
                        <div>
                            <Link
                                to="/"
                                onClick={() => window.scrollTo(0, 0)}
                                className="flex items-center gap-2"
                            >
                                <img src={ProjectLogo} alt="" className="h-12"/>
                            </Link>
                        </div>
                        {/* HashLinks section */}
                        <div className="hidden md:block">
                            <ul className="flex items-center gap-6">
                                <li className="py-4">
                                    <HashLink
                                        to="/#latest-reviews"
                                        className={
                                            location.hash === "#latest-reviews" ? "active" : ""
                                        }
                                        smooth
                                    >
                                        Latest Reviews
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink
                                        to="/#about"
                                        className={location.hash === "#about" ? "active" : ""}
                                        smooth
                                    >
                                        About
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink
                                        to="/#contact"
                                        className={location.hash === "#contact" ? "active" : ""}
                                        smooth
                                    >
                                        Contact
                                    </HashLink>
                                </li>
                            </ul>
                        </div>
                        {/* Add Reviews Button */}
                        <div>
                            <button
                                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r
                hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3
                py-1 rounded-md"
                            >
                                + Add Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;