import { MdOutlineRateReview } from "react-icons/md";
import Avatar, { genConfig } from 'react-nice-avatar'
import { useLocation } from "react-router-dom";

const ReviewDetail = () => {
    const location = useLocation();
    const selectedReview = location.state?.review;

    return (
        <div className="mx-auto mb-24">
            <div className="flex justify-center bg-gradient-to-r from-primary to-secondary h-[250px] w-full">
                <h1 className="text-4xl sm:text-6xl text-white uppercase pt-14 font-mono">
                    講義レビュー詳細
                </h1>
                <MdOutlineRateReview className="w-10 h-10 mt-10 text-white" />
            </div>
            <div className="px-4 sm:w-2/3 lg:w-1/2 mx-auto">
                <div className="rounded-lg shadow-lg bg-white -mt-24 py-10 md:py-12 px-4 md:px-6">
                    <div>
                        <div className="pb-6">
                            <Avatar className="w-32 h-32" {... genConfig(selectedReview.id) } />
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">教科名</h2>
                            <p className="text-lg text-gray-600 ml-4">{selectedReview.subject_name}</p>
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">評価</h2>
                            <div className="ml-4 text-2xl">{"⭐ ".repeat(selectedReview.rating)}</div>
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">課題量</h2>
                            <p className="text-lg text-gray-600 ml-4">{selectedReview.workload}</p>
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">コメント</h2>
                            <p className="text-lg text-gray-600 ml-4">{selectedReview.comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ReviewDetail;