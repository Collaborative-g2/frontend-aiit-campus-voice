import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaBook, FaTasks, FaCommentDots, FaStar } from "react-icons/fa";
import Avatar, { genConfig } from 'react-nice-avatar'
import TruncateText from "../shared/TruncateText.jsx";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${ACV_API_BASE_URL}/Prod/reviews?subject_id=`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.reviews); // Assuming the API returns an array of reviews
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

  }, []);

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
    responsive: [
      {
        breakpoint: 768, // Small screens (mobile)
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1024, // Medium screens (tablet)
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (loading) {
    return <p className="text-center">読み込み中...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">エラーが発生しました: {error}</p>;
  }

  return (
  <div className="container mx-auto p-4 sm:p-6 mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
      最近の口コミ
    </h2>
    <Slider {...settings}>
      {reviews.map((review) => (
        <div
          key={review.subjectId}
          className="p-4 sm:p-6 bg-gray-200 rounded-2xl shadow-xl max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
            <div className="flex justify-center sm:justify-start">
              <Avatar
                className="w-20 h-20 sm:w-32 sm:h-32"
                {...genConfig(review.subjectId)}
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center sm:text-left flex items-center">
                <FaBook className="text-blue-500 mr-2" /> {review.subject_name}
              </h3>
              <p className="text-gray-700 text-center sm:text-left flex items-center">
                <FaUser className="text-green-500 mr-2" />
                <strong className="font-semibold">教員：</strong> {review.professor}
              </p>
              <p className="text-gray-700 text-center sm:text-left flex items-center">
                <FaTasks className="text-yellow-500 mr-2" />
                <strong className="font-semibold whitespace-nowrap">課題量：</strong>{" "}
                {TruncateText(review.workload)}
              </p>
              <p className="text-gray-700 text-center sm:text-left flex items-center">
                <FaCommentDots className="text-purple-500 mr-2" />
                <strong className="font-semibold whitespace-nowrap">コメント：</strong>{" "}
                {TruncateText(review.comment)}
              </p>
              <p className="text-gray-700 text-center sm:text-left flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <strong className="font-semibold">評価：</strong>{" "}
                {"⭐".repeat(review.rating)}
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
