import React, { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

import ReviewMapSection from "../../components/ReviewMapSection/ReviewMapSection";
// import { Pagination } from "@mui/material";
import {
  getAllReviewsByLatLng,
  getAllReviewsForAdmin,
} from "../../utils/reviews";
import { useLocation } from "react-router";
// import { withRouter } from "react-router";

// import UserManagement from "../UserManagement/UserManagement";
{
  /* <UserManagement /> */
}
const Dashboard = () => {
  const [allReviews, setAllReviews] = useState([]);
  const location = useLocation();
  const reviewsByAdmin = location.state?.reviewByAdmin || false;
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        let response;
        if (reviewsByAdmin) {
          response = await getAllReviewsForAdmin();
          console.log(response.data);
        } else {
          response = await getAllReviewsByLatLng();
        }

        setAllReviews(response.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviews();
  }, [reviewsByAdmin, location]);

  // const [page, setPage] = useState(1);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  return (
    <div className="flex flex-col pl-6 py-4 pr-2">
      <Searchbar setAllReviews={setAllReviews} reviewsByAdmin={reviewsByAdmin} />
      <ReviewMapSection allReviews={allReviews} setAllReviews={setAllReviews} />
    </div>
  );
};

export default Dashboard;
