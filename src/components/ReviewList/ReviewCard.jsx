import { FaCommentDots, FaTasks } from "react-icons/fa";
import PropTypes from "prop-types";
import Avatar, { genConfig } from "react-nice-avatar";
import FormatDate from "../shared/FormatDate.jsx";
import TruncateText from "../shared/TruncateText.jsx";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  const handleReviewCardClick = () => {
    navigate(`/review/${review.id}`, {state: {review}});
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md relative pb-10" onClick={handleReviewCardClick}>
      <div className="flex justify-between">
        <Avatar className="w-24 h-24" {...genConfig(review.id)} />
        <div className="flex items-center">
          <div className="flex items-center p-2">
            <strong className="font-semibold">評価：</strong>
          </div>
          <div className="flex-[7] p-2">{"⭐".repeat(review.rating)}</div>
        </div>
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
      <div className="absolute bottom-2 right-2 p-2 text-sm">
        <div className="p-2">{FormatDate(review.created)}</div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject_id: PropTypes.string.isRequired,
    term: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    workload: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewCard;
