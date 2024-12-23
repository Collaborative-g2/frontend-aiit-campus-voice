import DiscussionMovie from "../../assets/discussion.mp4";

const Hero = () => {
    return (
        <>
            {/* Video section */}
            <div className="relative h-[700px]">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
                >
                    <source src={DiscussionMovie} type="video/mp4"/>
                </video>
                <div className="bg-black/20 h-full">
                    <div className="h-full flex justify-center items-center p-4 bg-primary/10">
                        <div className="container grid grid-cols-1 gap-4 px-0">
                            {/* text content section */}
                            <div className="text-white text-center font-mono">
                                <p className="font-semibold text-3xl">講義の評価が一目でわかる!</p>
                                <p className="font-medium">簡単検索であなたにぴったりの授業を</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
