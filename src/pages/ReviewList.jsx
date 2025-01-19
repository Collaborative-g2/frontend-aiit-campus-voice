import { useEffect, useRef, useState } from "react";
import ReviewCard from "../components/ReviewList/ReviewCard.jsx";
import { useLocation } from "react-router-dom";
import StarRating from "../components/shared/StarRating.jsx";
import axios from "axios";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const ReviewList = () => {
  const location = useLocation();
  const selectedSubject = location.state?.selectedSubject;
  const [data, setData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Reference to the Intersection Observer.
  const observerRef = useRef(null);

  const fetchData = async (page) => {
    // Prevent new requests while loading.
    if (isLoading || page > 1) return;
    setIsLoading(true);

    if (selectedSubject.subject_id) {
      try {
        const response = await axios.get(`${ACV_API_BASE_URL}/Prod/reviews/`, {
          params: { subject_id: selectedSubject.subject_id },
        });

        setAverageRating(response.data.average_rating)
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
    fetchData(page)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [page]);

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
            <div>
              <h1 className="font-extrabold text-gray-800">
                講義名: {selectedSubject.subject_name}
              </h1>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">
                教員名: {selectedSubject.professor}
              </h2>
            </div>
          </div>
          <div className="flex items-center flex-col lg:flex-row mt-4 lg:mt-0 space-x-4">
            <strong className="font-semibold text-gray-800">
              平均評価：{averageRating}
            </strong>
            <div className="flex">
              <StarRating
                average={averageRating}
                size={50}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((review) => (
            <ReviewCard key={`${review.id}`} review={review} />
          ))}
        </div>
        <div ref={observerRef} className="h-4"></div>
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      </div>
    </div>
  );
};

export default ReviewList;
