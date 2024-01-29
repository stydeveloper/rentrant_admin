import { Rating } from "@mui/material";
import { useState } from "react";
import EditReviewModal from "../EditReviewModal/EditReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import { formatDate } from "../../utils/helperFunctions";

const UserReview = ({ review, setAllReviews }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="reviewContainer flex flex-col items-start px-4 py-1 border-2 border-solid border-gray-50 shadow-md rounded-md ">
        <div className="title-container w-full flex justify-between">
          <h2 className="text-xl">{review?.name ? review.name : "Person 1"}</h2>
          <div className="btn-container flex gap-1">
            <button
              onClick={handleEditButtonClick}
              className=" rounded-md border border-solid border-gray-300 py-1 px-1"
            >
              <img src="/assets/editIcon.png" alt="edit-icon text-black" />
            </button>
            <button
              onClick={handleDeleteButtonClick}
              className="rounded-md border  border-solid border-gray-300 py-1 px-1"
            >
              <img src="/assets/blackBin.png" alt="delete-icon" />
            </button>
          </div>
        </div>
        <div className="location flex gap-1">
          <img src="/assets/locationIcon.png" alt="location-icon" />
          <span>
            {review.address ? review.address.slice(0, 70) : "Luxembourg"}
          </span>
        </div>
        <div className="rating ">
          <span className="text-gray-400 text-sm">rating</span>
          <div className="rating flex items-center justify-center gap-2 ">
            <Rating
              name="half-rating-read"
              value={review.rating || 3}
              defaultValue={0}
              precision={0.1}
              readOnly
              sx={{ marginLeft: "-2px" }}
            />
            <h4 className="text-base mt-1">
              {review.reviewcount ? review.reviewcount : "1.4k"}
            </h4>
          </div>
        </div>
        <span className="text-gray-400 text-base">Comment</span>
        <p style={{ fontSize: "14px" }}>
          {review.review}
          {/* The rental met expectations, but did not deliever on basic
          upkeeping The rental met expectations, but did not deliever on basic
          upkeeping.. */}
        </p>
        <div className="date-ip-container flex gap-2">
          <h5 className="text-sm">
            <span className="text-gray-400">Date:</span>{" "}
            {formatDate(review.created_at)}
          </h5>
          <h5 className="text-sm">
            <span className="text-gray-400">IP Address:</span> {review.ip}
          </h5>
        </div>
      </div>

      {isEditModalOpen && (
        <EditReviewModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          initialReview={review} // Pass the initial review data to the modal
          setAllReviews={setAllReviews}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteReviewModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          initialReview={review}
          setAllReviews={setAllReviews}
        />
      )}
    </>
  );
};

export default UserReview;
