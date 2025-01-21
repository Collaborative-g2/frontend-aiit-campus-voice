import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaBook, FaTasks, FaCommentDots, FaStar } from "react-icons/fa";
import Avatar, { genConfig } from 'react-nice-avatar'
import TruncateText from "../shared/TruncateText.jsx";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSliderReviewCardClick = (review) => {
    navigate(`/review/${review.id}`, {state: {review}});
  };

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
        setIsLoading(false);
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

  if (isLoading) {
    return  <div className="w-full px-6 py-3 flex justify-center items-center">
              <ThreeDots color="#F0951F" height={80} width={80} />
            </div>;
  }

  if (error) {
    return <p className="text-center text-red-500">エラーが発生しました: {error}</p>;
  }

  return (
  <div className="container mx-auto p-2 sm:p-6 mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
      最近の口コミ
    </h2>
    <Slider {...settings} className="cursor-pointer">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 sm:p-6 bg-gray-200 rounded-2xl shadow-xl max-w-md mx-auto"
          onClick={() => handleSliderReviewCardClick(review)}
        >
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
            <div>
              <div className="flex justify-between">
                <Avatar className="w-24 h-24" {...genConfig(review.id)} />
                <div className="flex items-center">
                  <div className="flex items-center p-2">
                    <FaStar className="text-yellow-500 mr-2" />
                    <strong className="font-semibold">評価：</strong>
                  </div>
                  <div className="flex-[7] pr-2">{"⭐".repeat(review.rating)}</div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex items-center flex-[3] p-2">
                  <FaBook className="text-blue-500 mr-2" />
                  <strong className="font-semibold whitespace-nowrap">講義名：</strong>
                </div>
                <div className="flex-[10] p-2">{review.subject_name}</div>
              </div>
              <div className="flex w-full">
                <div className="flex items-center flex-[3] p-2">
                  <FaUser className="text-green-500 mr-2" />
                  <strong className="font-semibold whitespace-nowrap">教員名：</strong>
                </div>
                <div className="flex-[7] p-2">{TruncateText(review.professor)}</div>
              </div>
              <div className="flex w-full">
                <div className="flex items-center flex-[3] p-2">
                  <FaTasks className="text-yellow-500 mr-2" />
                  <strong className="font-semibold whitespace-nowrap">課題量：</strong>
                </div>
                <div className="flex-[7] p-2">{TruncateText(review.workload)}</div>
              </div>
              <div className="flex w-full">
                <div className="flex items-center flex-[3] p-2">
                  <FaCommentDots size={18} className="text-purple-500 mr-1" />
                  <strong className="font-semibold whitespace-nowrap">
                    コメント：
                  </strong>
                </div>
                <div className="flex-[7] p-2">{TruncateText(review.comment)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);
};

export default Reviews;
