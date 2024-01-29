import React, { useState } from "react";
import { Rating } from "@mui/material";
import "./EditReviewModal.css";
import { Close } from "@mui/icons-material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { editReview, getAllReviewsByLatLng } from "../../utils/reviews";
import { toast } from "react-toastify";

const EditReviewModal = ({ open, onClose, initialReview, setAllReviews }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSaveChanges = async () => {
    // Log the values for now
    console.log("Name:", name);
    console.log("Rating:", rating);
    console.log("Review:", review);

    const updatedReview = {
      name,
      rating,
      review,
    };

    if (!initialReview.id) {
      console.log("not received id from parent component");
      onClose();
      return;
    }

    try {
      // Call editReview to update the backend
      const res = await editReview(initialReview.id, updatedReview);
      toast.success(`${res.data.message}`, { position: "top-right" });

      // Fetch all data from the backend
      const updatedData = await getAllReviewsByLatLng();
      setAllReviews(updatedData.data.reviews);

      onClose();
    } catch (error) {
      console.log(error);

      // Handle the error, display an error message to the user
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="bg-white p-8 text-center flex flex-col items-center relative">
        <DialogTitle>
          <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold">Edit Review</h5>
            <IconButton
              sx={{ position: "absolute", top: "0.7rem", right: "0.7rem" }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col w-full">
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />

          {/* Label for Rating */}
          <h1 className="text-gray-400 text-lg my-1 text-left">Rating</h1>
          <Rating
            name="rating"
            value={rating}
            className="custom-rating mb-4 self-start flex"
            onChange={(event, newValue) => setRating(newValue)}
            precision={1}
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-500 text-white self-center"
            onClick={handleSaveChanges}
            style={{ marginTop: "10px" }}
          >
            Save Changes
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditReviewModal;
