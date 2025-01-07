import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaBook, FaTasks, FaCommentDots, FaStar } from "react-icons/fa";
import Avatar, { genConfig } from 'react-nice-avatar'

const recentReviews = [
  {
    subjectId: "ISA036",
    subjectName: "データマネジメント特論",
    professor: "浪岡保男",
    workload: "課題が多くて大変だった",
    comment: "課題が多くて大変だったけどPBLに向けた良い経験ができた。",
    rating: 5,
  },
  {
    subjectId: "ISA101",
    subjectName: "人工知能基礎論",
    professor: "山田太郎",
    workload: "毎週レポートがあり大変だった",
    comment: "レポートが多くて大変だったが、AIの基礎をしっかり学べた。",
    rating: 4,
  },
  {
    subjectId: "ISA202",
    subjectName: "データベース応用論",
    professor: "佐藤花子",
    workload: "グループワークが中心で時間がかかった",
    comment: "グループワークを通じて実践的なスキルが身についた。",
    rating: 5,
  },
  {
    subjectId: "ISA303",
    subjectName: "ネットワークセキュリティ",
    professor: "田中一郎",
    workload: "試験勉強が大変だった",
    comment: "試験範囲が広くて勉強が大変だったが、セキュリティの重要性を理解できた。",
    rating: 4,
  },
  {
    subjectId: "ISA404",
    subjectName: "プログラミング演習",
    professor: "鈴木二郎",
    workload: "週ごとに新しい課題があった",
    comment: "課題の量は多かったが、実践的なプログラミング力がついた。",
    rating: 5,
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true,
  };

  return (
    <div className="container mx-auto p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">最近の口コミ</h2>
      <Slider {...settings}>
        {recentReviews.map((review) => (
            <div key={review.subjectId} className="p-6 bg-gray-200 rounded-2xl shadow-xl max-w-lg">
            <div className="flex justify-center gap-4">
                <div>
                    <Avatar className="w-32 h-32" {... genConfig(review.subjectId) } />
                </div>
                <div>
                <h3 className="text-xl font-semibold mb-2 text-left flex items-center">
                <FaBook className="text-blue-500 mr-2" /> {review.subjectName}
                </h3>
                <p className="text-gray-700 text-left flex items-center">
                <FaUser className="text-green-500 mr-2" />
                <strong className="font-semibold">教員：</strong> {review.professor}
                </p>
                <p className="text-gray-700 text-left flex items-center">
                <FaTasks className="text-yellow-500 mr-2" />
                <strong className="font-semibold whitespace-nowrap">課題量：</strong> {review.workload}
                </p>
                <p className="text-gray-700 text-left flex items-center">
                <FaCommentDots className="text-purple-500 mr-2" />
                <strong className="font-semibold whitespace-nowrap">コメント：</strong> {review.comment}
                </p>
                <p className="ttext-gray-700 text-left flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <strong className="font-semibold">評価：</strong> {"⭐".repeat(review.rating)}
                </p>
            </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
