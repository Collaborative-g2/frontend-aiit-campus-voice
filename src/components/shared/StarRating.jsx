import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const StarRating = ({ average, size }) => {
  const TOTAL_STARS = 5;
  const decimal = average - Math.floor(average);
  let adjustedAverage = Math.floor(average);
  if (decimal >= 0.5) {
    adjustedAverage += 0.5;
  }
  const fullStars = Math.floor(adjustedAverage);
  const hasHalfStar = decimal >= 0.5 && decimal < 1;
  const emptyStars = TOTAL_STARS - Math.ceil(adjustedAverage);

  return (
    <>
      {/* Full stars */}
      {Array(fullStars)
        .fill(fullStars)
        .map((_, index) => (
          <FaStar
            key={`full-${index}`}
            className="text-yellow-500"
            size={size}
          />
        ))}

      {/* Half star */}
      <div className="relative inline-block">
        {hasHalfStar && (
          <FaStarHalfAlt key="half" className="text-yellow-500" size={size} />
        )}
      </div>

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(emptyStars)
        .map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            className="text-yellow-500"
            size={size}
          />
        ))}
    </>
  );
};

StarRating.propTypes = {
  average: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default StarRating;
