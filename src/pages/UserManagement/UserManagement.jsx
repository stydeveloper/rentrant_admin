import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../utils/reviews";
import { useNavigate } from "react-router";
import { addBlackListIp, removeBlackListIp } from "../../utils/users";
import { toast } from "react-toastify";

export default function UserManagement() {
  const [reviews, setReviews] = useState([]);
  const [restrictedIPs, setRestrictedIPs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Restricted IPs:", restrictedIPs);
  }, [restrictedIPs]);
  // Move handleReviewList function inside the UserManagement component
  const handleReviewList = (ip) => {
    // Handle the action for viewing reviews
    console.log(`View reviews for IP: ${ip}`);
    navigate("/user-details", {
      state: {
        ip: `${ip}`,
      },
    });
  };

  const handleRestrictUser = async (ip) => {
    // Handle the action for restricting user
    try {
      console.log("IP to be restricted:", ip); // Log IP before updating the state
      const response = await addBlackListIp(ip);
      console.log(response);
      toast.success(`${response.data.message}`, { position: "top-right" });

      // Update the state to mark the IP as restricted
      setRestrictedIPs((prevRestrictedIPs) => [
        ...prevRestrictedIPs,
        ip.toString(), // Ensure that the IP is stored as a string
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUnRestrictUser = async (ip) => {
    try {
      console.log("IP to be unrestricted:", ip);
      const response = await removeBlackListIp(ip);
      console.log(response);
      toast.success(`${response.data.message}`, { position: "top-right" });

      // Update the state to remove the IP from the restricted list
      setRestrictedIPs((prevRestrictedIPs) =>
        prevRestrictedIPs.filter((item) => item !== ip.toString())
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteUser = (userId) => {
    // Handle the action for deleting user
    console.log(`Delete user with ID: ${userId}`);
  };

  useEffect(() => {
    // Function to fetch all reviews
    const fetchReviews = async () => {
      try {
        // Assuming you have a function to fetch reviews from an API
        const response = await getAllReviews(); // Replace with your API call
        setReviews(response.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, []); // Empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  const rows = reviews.map((review, index) => ({
    id: index + 1,
    ip: review.ip,
    numReviews: review.reviews.length,
  }));

  // Map the columns to change color based on the restricted state
  const columns = [
    {
      field: "ip",
      headerName: "IP",
      width: 200,
      align: "left",
      renderCell: (params) => {
        const isRestricted = restrictedIPs.find(
          (item) => item === params.row.ip.toString()
        );
        return (
          <div
            className={`text-${isRestricted ? "red" : "black"} ${
              isRestricted ? "line-through" : ""
            }`}
          >
            {params.row.ip}
          </div>
        );
      },
    },
    {
      field: "numReviews",
      headerName: "No. of Reviews by User",
      width: 300,
      align: "left",
    },
    {
      field: "reviewList",
      headerName: "Review List",
      width: 200,
      sortable: false,
      align: "left",
      renderCell: (params) => (
        <button
          className="px-10 py-1 rounded-md bg-blue-500"
          onClick={() => handleReviewList(params.row.ip)}
        >
          <img
            className="w-[24.5px] h-[24.5px]"
            src="/assets/reviewList.png"
            alt=""
            style={{ color: "white" }}
          />
        </button>
      ),
    },
    {
      field: "restrictUser",
      headerName: "User",
      width: 200,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        const isRestricted = restrictedIPs.find(
          (item) => item === params.row.ip.toString()
        );
        return (
          <button
            className={`px-10 py-1 rounded-md ${
              isRestricted ? "bg-orange-500" : "bg-blue-500"
            }`}
            onClick={() =>
              isRestricted
                ? handleUnRestrictUser(params.row.ip)
                : handleRestrictUser(params.row.ip)
            }
          >
            <img
              className={`w-[25px] h-[25px] ${
                isRestricted ? "text-white" : "text-black"
              }`}
              src="/assets/block.png"
              alt=""
              style={{ color: "white" }}
            />
          </button>
        );
      },
    },
    {
      field: "deleteUser",
      headerName: "Delete User",
      width: 200,
      sortable: false,
      align: "left",
      renderCell: (params) => (
        <button
          className="px-10 py-1 rounded-md bg-green-600"
          onClick={() => handleDeleteUser(params.row.id)}
        >
          <img
            src="/assets/delete.png"
            alt="delete"
            className="w-[25px] h-[25px]"
            style={{ color: "white !important" }}
          />
        </button>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
