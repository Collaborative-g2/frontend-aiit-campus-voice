import { useEffect, useRef, useState } from "react";
import ReviewCard from "../components/ReviewList/ReviewCard.jsx";
import { useLocation } from "react-router-dom";
import {FaStar} from "react-icons/fa";

const ReviewList = () => {
  const location = useLocation();
  const selectedSubject = location.state?.selectedSubject;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Reference to the Intersection Observer.
  const observerRef = useRef(null);

  // Mock API call
  const fetchData = async (page) => {
    // Prevent new requests while loading.
    // Add a condition to ensure the page doesn't exceed 3, limited to the mock API.
    if (isLoading || page > 3) return;
    setIsLoading(true);

    try {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        subject_id: "ISA036",
        subject_name: "",
        term: "",
        rating: 5,
        workload: "課題が多くて大変だった",
        comment: "課題が多くて大変だったけどPBLに向けた良い経験ができた。",
        created_at: "",
      }));

      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      // Clear the flag after loading is complete.
      setIsLoading(false);
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
          // Fetch the next page
          setPage((prevPage) => prevPage + 1);
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
            <div><h1 className="font-extrabold text-gray-800">講義名: {selectedSubject.subject_name}</h1></div>
            <div><h2 className="font-semibold text-gray-800">教員名: {selectedSubject.professor}</h2></div>
          </div>
          <div className="flex items-center flex-col lg:flex-row mt-4 lg:mt-0">
            <strong className="font-semibold text-gray-800">平均評価：</strong>
            <div className="flex">
              {Array(5)
                  .fill()
                  .map((_, index) => (
                      <FaStar key={index} className="text-yellow-500" size={50}/>
                  ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review}/>
          ))}
        </div>
        <div ref={observerRef} className="h-4"></div>
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      </div>
    </div>
  );
};

export default ReviewList;
