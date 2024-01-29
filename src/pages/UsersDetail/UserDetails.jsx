import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteReviewById, getReviewsByIp } from "../../utils/reviews";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/helperFunctions";
import DeleteSingleReviewModal from "../../components/DeleteSingleReviewModal/DeleteSingleReviewModal";

export default function UserDetails() {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});

  const { state } = location;

  useEffect(() => {
    // Function to fetch all reviews
    const { ip } = state;
    const fetchReviews = async () => {
      try {
        // Assuming you have a function to fetch reviews from an API
        const response = await getReviewsByIp(ip);
        setReviews(response.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, [state]); // Add state as a dependency to fetch reviews when the state changes

  const columns = [
    { field: "name", headerName: "Name", width: 130, align: "left" },
    { field: "ip", headerName: "IP", width: 150, align: "left" },
    { field: "address", headerName: "Location", width: 500, align: "left" },
    {
      field: "created_at",
      headerName: "Date",
      width: 200,
      align: "left",
      renderCell: (params) => <span>{params.row.created_at}</span>,
    },
    {
      field: "deleteReview",
      headerName: "Delete Review",
      width: 200,
      sortable: false,
      align: "left",
      renderCell: (params) => (
        <button
          className="px-10 py-1 rounded-md bg-green-600"
          onClick={() => handleDeleteReview(params.row.id)}
        >
          <img
            src="/assets/delete.png"
            alt=""
            className="w-[25px] h-[25px]"
            style={{ color: "white" }}
          />
        </button>
      ),
    },
  ];
  const rows = reviews.map((review) => ({
    id: review.id,
    name: review.name,
    ip: review.ip,
    address: review.address,
    created_at: formatDate(review.created_at),
  }));

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    console.log("handleCloseDeleteModal running");
    setIsDeleteModalOpen(false);
  };

  const handleDeleteReview = async (reviewId) => {
    const obj = reviews.find((item) => item.id === reviewId);
    setCurrentReview(obj);
    handleDeleteButtonClick();
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={2} checkboxSelection />
      {isDeleteModalOpen && (
        <DeleteSingleReviewModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          initialReview={currentReview}
          setReviews={setReviews}
        />
      )}
    </div>
  );
}
