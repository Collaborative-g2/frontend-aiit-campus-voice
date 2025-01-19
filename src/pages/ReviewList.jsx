import { useEffect, useRef, useState } from "react";
import ReviewCard from "../components/ReviewList/ReviewCard.jsx";
import { useLocation } from "react-router-dom";
import StarRating from "../components/shared/StarRating.jsx";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { FaBook, FaUser } from "react-icons/fa";
import BearBowing from "../assets/bear-bowing.png";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const ReviewList = () => {
  const location = useLocation();
  const selectedSubject = location.state?.selectedSubject;
  const [data, setData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  // TODO Pagination is not implemented on the back-end, so the front-end will handle it once it's ready.
  // const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Reference to the Intersection Observer.
  const observerRef = useRef(null);

  const fetchData = async () => {
    // TODO Pagination is not implemented on the back-end, so the front-end will handle it once it's ready.
    // if (isLoading || page > 1) return;
    // Prevent new requests while loading.
    if (isLoading) return;

    setIsLoading(true);

    if (selectedSubject.subject_id) {
      try {
        const response = await axios.get(`${ACV_API_BASE_URL}/Prod/reviews/`, {
          params: { subject_id: selectedSubject.subject_id },
        });

        setAverageRating(response.data.average_rating);
        setData((prevData) => [...prevData, ...response.data.reviews]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        // Clear the flag after loading is complete.
        setIsLoading(false);
      }
    }
  };

  // Initial data retrieval
  useEffect(() => {
    fetchData()
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  // Intersection Observer configuration
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          // TODO Pagination is not implemented on the back-end, so the front-end will handle it once it's ready.
          // Fetch the next page
          // setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.7 }, // Trigger when the element is 70% visible.
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between flex-col lg:flex-row p-4">
          <div>
            <h1 className="flex items-center font-extrabold text-gray-800">
              <FaBook className="text-blue-500 mr-2" />
              講義名: {selectedSubject.subject_name}
            </h1>
            <h2 className="flex items-center font-semibold text-gray-800">
              <FaUser className="text-green-500 mr-2" />
              教員名: {selectedSubject.professor}
            </h2>
          </div>
          <div className="flex items-center flex-col lg:flex-row mt-4 lg:mt-0 space-x-4">
            <strong className="font-semibold text-gray-800">
              平均評価：{averageRating}
            </strong>
            <div className="flex">
              <StarRating average={averageRating} size={50} />
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="w-full px-6 py-3 flex justify-center items-center">
            <ThreeDots color="#F0951F" height={80} width={80} />
          </div>
        )}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((review) => (
              <ReviewCard key={`${review.id}`} review={review} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col sm:flex-row items-center justify-center text-gray-600 mt-4">
              <img
                src={BearBowing}
                alt="bear-bowing"
                className="w-40 h-40 sm:w-48 sm:h-48 mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left text-2xl sm:text-3xl">
                <p className="font-mono">申し訳ございません</p>
                <p className="font-mono">{selectedSubject.subject_name}には</p>
                <p className="font-mono">まだ口コミが存在しません</p>
              </div>
            </div>
          )
        )}
        <div ref={observerRef} className="h-4"></div>
      </div>
    </div>
  );
};

export default ReviewList;
