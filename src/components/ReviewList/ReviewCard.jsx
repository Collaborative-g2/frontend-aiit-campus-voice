import { FaCommentDots, FaStar, FaTasks } from "react-icons/fa";
import PropTypes from "prop-types";
import Avatar, { genConfig } from "react-nice-avatar";

const ReviewCard = ({ review }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <Avatar className="w-24 h-24" {...genConfig(review.subject_id)} />
        <div className="flex items-center">
          <div className="flex items-center p-2">
            <FaStar className="text-yellow-500 mr-2" />
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
        <div className="flex-[7] p-2">{review.workload}</div>
      </div>
      <div className="flex w-full">
        <div className="flex items-center flex-[3] p-2">
          <FaCommentDots size={18} className="text-purple-500 mr-1" />
          <strong className="font-semibold whitespace-nowrap">
            コメント：
          </strong>
        </div>
        <div className="flex-[7] p-2">{review.comment}</div>
      </div>
      <div className="flex w-full justify-end">
        <div className="p-2">{review.id}</div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject_id: PropTypes.string.isRequired,
    subject_name: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    workload: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewCard;
