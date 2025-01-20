import AboutLogo1 from "../../assets/about1.svg";
import AboutLogo2 from "../../assets/about2.svg";
import AboutLogo3 from "../../assets/about3.svg";

const About = () => {
    return(
        <>
            <div className="container mx-auto px-4 py-8 bg-orange-300">
                <h1 className="text-center text-4xl font-extrabold text-gray-700 mb-8 underline">履修登録時にこんな経験はありませんか？</h1>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 px-4 mb-6">
                        <div className="bg-white border-2 border-gray-500 rounded-lg shadow pt-6 px-6 pb-2 relative">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">講義内容や講義形式がシラバスと異なる</h2>
                            <p className="text-base text-gray-600">講義内容や講義形式がシラバスに記載してある内容と異なり、履修してみたら自分の興味や目的と異なっていた。</p>
                            <div className="flex justify-end">
                                <img src={AboutLogo1} className="w-22 h-20 object-cover rounded-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-6">
                        <div className="bg-white border-2 border-gray-500 rounded-lg shadow pt-6 px-6 pb-2 relative">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">課題や講義時間の負担感の不透明さ</h2>
                            <p className="text-base text-gray-600">課題の量や頻度、準備にかかる時間について具体的な情報が不足しているため、他の講義や仕事、家事とのバランスが取りにくい。</p>
                            <div className="flex justify-end">
                                <img src={AboutLogo2} className="w-22 h-20 object-cover rounded-3xl" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 px-4 mb-6">
                        <div className="bg-white border-2 border-gray-500 rounded-lg shadow pt-6 px-6 pb-2 relative">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">専門性の高さや基礎知識の不足への不安</h2>
                            <p className="text-base text-gray-600">専門的な内容を扱う講義の場合、自分の基礎知識が十分かどうか分からず、不安を感じる。</p>
                            <div className="flex justify-end">
                                <img src={AboutLogo3} className="w-20 h-20 object-cover rounded-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white text-center py-10">
                    <h1 className="text-center text-4xl font-extrabold text-gray-700 mb-8">AIIT Campus Voiceなら!!</h1>
                    <p className="text-xl mt-4 text-gray-700 font-bold">実際にAIITで学んでいる生徒や元生徒の口コミがわかるから、後悔しないキャンパスライフが実現します。</p>
                </div>
            </div>
        </>
    );
};

export default About;
