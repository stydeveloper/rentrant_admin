import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import { addReview, getAllReviewsByLatLng } from "../../utils/reviews";
import { toast } from "react-toastify";

const AddNewReviewModal = ({
  open,
  onClose,
  newAddress,
  newLocation,
  setAllReviews,
  setShowButton,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleAddReview = async () => {
    try {
      const newReview = {
        name: "Anonymus",
        rating,
        review,
        address: newAddress,
        lat: newLocation.lat,
        lng: newLocation.lng,
      };
      const res = await addReview(newReview);
      toast.success(`${res.data.message}`, { position: "top-right" });
      // Fetch all data from the backend
      const updatedData = await getAllReviewsByLatLng();
      setAllReviews(updatedData.data.reviews);
      setReview("");
      setRating(0);
      setShowButton(false);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Add New Review</h2>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <form>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            className="custom-rating"
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddReview}>
            Add Review
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddNewReviewModal;
