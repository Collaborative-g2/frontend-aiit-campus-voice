import Hero from "../components/Home/Hero.jsx";
import {useEffect} from "react";
import Reviews from "../components/Home/Reviews.jsx";
import About from "../components/Home/About.jsx";

const Home = () => {
    useEffect(() => {
        if (window.location.hash === "#latest-reviews") {
            document.getElementById("latest-reviews")?.scrollIntoView({behavior: "smooth"});
        }
    }, []);

    return (
        <>
            <div>
                <Hero/>
                {/* <section id="latest-reviews" className="h-[500px] bg-white scroll-mt-10 py-10">
                    Latest Reviews
                </section> */}
                <Reviews/>
                <section id="about" className="bg-orange-300 scroll-mt-10 py-10">
                    <About/>
                </section>
                
                {/* <section id="contact" className="h-[500px] bg-white scroll-mt-10 py-10">
                    Contact
                </section> */}
            </div>
        </>
    );
};

export default Home;