import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteReviewById, getAllReviewsByLatLng } from "../../utils/reviews";
import { toast } from "react-toastify";

const DeleteReviewModal = ({ open, onClose, initialReview, setAllReviews }) => {
  const handleDelete = async () => {
    // deleteReviewById
    try {
      if (!initialReview.id) {
        console.log("id not received from parent component");
        onClose();
        return;
      }
      const res = await deleteReviewById(initialReview.id);
      toast.success(`${res?.message}`, { position: "top-right" });

      // If setAllReviews is provided, fetch updated data and call setAllReviews
      if (setAllReviews) {
        const updatedData = await getAllReviewsByLatLng();
        setAllReviews(updatedData.data.reviews);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="bg-white p-2 text-center flex flex-col items-center relative">
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold">Delete Review</h5>
            <IconButton
              sx={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col w-full">
          <p className="text-base mb-4">
            Are you sure you want to delete this review?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="contained"
              color="primary"
              className="bg-red-500 text-white"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={onClose}>
              No
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteReviewModal;
