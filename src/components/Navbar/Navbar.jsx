import {Link, useLocation, useNavigate} from "react-router-dom";
import ProjectLogo from "../../assets/project-logo.svg";
import {HashLink} from "react-router-hash-link";
import {MdAddComment} from "react-icons/md";
import {useState} from "react";
import {HiMenu, HiX} from "react-icons/hi";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="p-2">
                                {isOpen ? <HiX size={24}/> : <HiMenu size={24}/>}
                            </button>
                        </div>

                        {/* Desktop navigation */}
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
                                        to="https://docs.google.com/forms/d/e/1FAIpQLSdlfVz0WBKD_ML_IqtqoSKAGtAqzzSjZmSB4pHTVQL7KeFGVA/viewform?usp=dialog"
                                        className={location.hash === "#contact" ? "active" : ""}
                                        smooth
                                    >
                                        Contact
                                    </HashLink>
                                </li>
                            </ul>
                        </div>

                        {/* Add Reviews Button */}
                        <div className="hidden md:block">
                            <button
                                className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r
                hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3
                py-1 rounded-md"
                                onClick={() => navigate("/reviews/new")}
                            >
                                <MdAddComment/>
                                投稿
                            </button>
                        </div>
                    </div>

                    {/* Mobile navigation */}
                    <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col items-center gap-4 py-4">
                            <li>
                                <HashLink
                                    to="/#latest-reviews"
                                    className={location.hash === "#latest-reviews" ? "active" : ""}
                                    smooth
                                    onClick={toggleMenu}
                                >
                                    Latest Reviews
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    to="/#about"
                                    className={location.hash === "#about" ? "active" : ""}
                                    smooth
                                    onClick={toggleMenu}
                                >
                                    About
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    to="https://docs.google.com/forms/d/e/1FAIpQLSdlfVz0WBKD_ML_IqtqoSKAGtAqzzSjZmSB4pHTVQL7KeFGVA/viewform?usp=dialog"
                                    className={location.hash === "#contact" ? "active" : ""}
                                    smooth
                                    onClick={toggleMenu}
                                >
                                    Contact
                                </HashLink>
                            </li>
                            <li>
                                <button
                                    className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r
                    hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3
                    py-1 rounded-md"
                                    onClick={() => {
                                        navigate("/reviews/new");
                                        toggleMenu();
                                    }}
                                >
                                    <MdAddComment/>
                                    投稿
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;