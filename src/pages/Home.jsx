import Hero from "../components/Home/Hero.jsx";

const Home = () => {
    return (
        <>
            <div>
                <Hero/>
                <section id="latest-reviews" className="h-[500px] bg-white scroll-mt-10 py-10">
                    Latest Reviews
                </section>
                <section id="about" className="h-[500px] bg-orange-300 scroll-mt-10 py-10">
                    About
                </section>
                <section id="contact" className="h-[500px] bg-white scroll-mt-10 py-10">
                    Contact
                </section>
            </div>
        </>
    );
};

export default Home;