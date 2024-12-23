import DiscussionMovie from "../../assets/discussion.mp4";
import {AiOutlineSearch} from "react-icons/ai";
import {useState} from "react";

const Hero = () => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const mockSubjectSuggestions = [
        "ネットワーク特論",
        "オブジェクト指向プログラミング特論",
        "フレームワーク開発特論",
        "情報セキュリティ特論",
        "ソフトウェア工学特論",
        "データ分析特論",
        "クラウドサーバ構築特論",
        "クラウドインフラ構築特論",
        "コラボレイティブ開発特論",
    ];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = mockSubjectSuggestions.filter((item) =>
                item.includes(value)
            );
            // The subject suggestion list is limited to 10 items.
            setSuggestions(filteredSuggestions.slice(0, 10));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setShowSuggestions(false);
    };

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
                            {/* Search bar section */}
                            <div className="container py-4 relative w-full max-w-[1000px]">
                                <div className="relative flex items-center bg-gray-100 rounded-full">
                                    {/* Search button */}
                                    <button
                                        className="absolute left-3 p-2 flex items-center jufstify-center"
                                    >
                                        <AiOutlineSearch className="w-5 h-5 text-primary" strokeWidth={30} />
                                    </button>
                                    {/* Input field */}
                                    <input
                                        type="text"
                                        name="destination"
                                        id="destination"
                                        placeholder="Search..."
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-2 bg-transparent focus:outline-primary focus:outline-none rounded-full"
                                    />
                                </div>

                                {/* Suggestion list */}
                                {showSuggestions && (
                                    <ul className="relative bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-w-[1000px]">
                                        {suggestions.length > 0 ? (
                                            suggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    className="p-2 hover:bg-blue-100 cursor-pointer"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-2 text-gray-500">No suggestions found</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
