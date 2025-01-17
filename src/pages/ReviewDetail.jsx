import { MdOutlineRateReview } from "react-icons/md";
import Avatar, { genConfig } from 'react-nice-avatar'

const ReviewDetail = () => {
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
                            <Avatar className="w-32 h-32" {... genConfig("ID") } />
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">教科名</h2>
                            <p className="text-lg text-gray-600 ml-4">データマネジメント特論</p>
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">評価</h2>
                            <div className="ml-4 text-2xl">{"⭐ ".repeat(4)}</div>    
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">課題量</h2>
                            <p className="text-lg text-gray-600 ml-4">課題は毎週1〜2個程度で、分量は適度です。内容は授業で学んだ知識を復習したり、実際に応用するものが中心で、学習効果を実感できます。中にはレポート作成や資料調査が必要な課題もあり、時間をかけて取り組む必要があります。後半に進むにつれてやや課題量が増えるため、早めにスケジュールを立てて取り組むのがおすすめです。コツコツ進めれば十分対応可能な範囲ですが、油断すると負担になることもあるので注意が必要です。</p>
                        </div>
                        <div className="my-4">
                            <h2 className="text-2xl font-extrabold text-gray-600 mb-2">コメント</h2>
                            <p className="text-lg text-gray-600 ml-4">講義はスライドや実例を活用したわかりやすい説明が特徴で、初心者でも理解しやすい構成になっています。講師は質問にも丁寧に対応してくれ、参加者の理解度を重視した進行が印象的でした。グループワークやディスカッションの機会が適度に設けられており、他の受講生と意見交換することで新しい視点を得られるのも良い点です。また、講義内容は実践的で、学んだことをすぐに応用できる場面も多く、意欲的に取り組む人にとっては非常に有意義な講義と言えます。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ReviewDetail;