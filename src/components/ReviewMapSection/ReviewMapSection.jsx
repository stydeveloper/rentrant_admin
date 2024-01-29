import React, { useEffect, useRef, useState } from "react";
import { Pagination, Rating } from "@mui/material";
import FilterButton from "../FilterButton/FilterButton";
import MapComponent from "../MapComponent/MapComponent";
import UserReview from "../UserReview/UserReview";
import AddNewReviewModal from "../AddNewReviewModal/AddNewReviewModal"; // Import the modal
import {
  fetchAverageRating,
  fetchMapboxAddressSuggestions,
} from "../../utils/mapbox";

const ReviewMapSection = ({ allReviews, setAllReviews }) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPins, setCurrentPins] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newLocation, setNewLocation] = useState({
    lat: null,
    lng: null,
  });
  const mapRef = useRef();

  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    zoom: 14,
  }); // Add viewport state
  const [isAddReviewModalOpen, setAddReviewModalOpen] = useState(false); // Add state for the modal

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [reviewCounts, setReviewCounts] = useState({});

  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;

  useEffect(() => {
    // Extract all fields from allReviews and update currentPins
    const updatedPins = allReviews
      .slice(indexOfFirstReview, indexOfLastReview)
      .map((review) => ({
        id: review.id,
        ip: review.ip,
        address: review.address,
        lat: parseFloat(review.lat),
        lng: parseFloat(review.lng),
        rating: review.rating,
        review: review.review,
        name: review.name,
        created_at: review.created_at,
        updated_at: review.updated_at,
        reviewcount: review.reviewcount,
        avgrating: !isNaN(parseFloat(review.avgrating))
          ? parseFloat(review.avgrating).toFixed(1)
          : null,
      }));
    setCurrentPins(updatedPins);

    // Update viewport based on the first pin's lat and lng
    if (updatedPins.length > 0) {
      setViewport({
        latitude: updatedPins[0].lat,
        longitude: updatedPins[0].lng,
        zoom: 14,
      });
    }
  }, [allReviews, currentPage]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddReviewButtonClick = () => {
    setAddReviewModalOpen(true);
  };

  const handleAddReviewModalClose = () => {
    setAddReviewModalOpen(false);
  };

  const fetchAddressSuggestions = async (query) => {
    const accessToken = import.meta.env.VITE_REACT_MAPBOX_ACCESS_TOKEN;

    try {
      // Fetch address suggestions from Mapbox
      const addressSuggestions = await fetchMapboxAddressSuggestions(
        query,
        accessToken
      );

      // Fetch review counts for each suggestion
      const suggestionsWithCounts = await Promise.all(
        addressSuggestions.slice(0, 3).map(async (feature) => {
          const [lng, lat] = feature.center;
          const reviewCount = await fetchAverageRating(lat, lng);
          return {
            name: feature.place_name,
            center: feature.center,
            reviewCount,
          };
        })
      );

      // Update State with Review Counts
      setReviewCounts(
        suggestionsWithCounts.reduce(
          (acc, suggestion) => ({
            ...acc,
            [suggestion.name]: suggestion.reviewCount,
          }),
          {}
        )
      );

      // Extract suggestion names for returning
      const limitedSuggestions = suggestionsWithCounts.map(
        (feature) => feature.name
      );

      return limitedSuggestions;
    } catch (error) {
      console.error("Error fetching address suggestions:", error.message);
      return [];
    }
  };

  // Attach an input event listener to the search input field
  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (inputValue.trim() !== "") {
      const addressSuggestions = await fetchAddressSuggestions(inputValue);
      setSuggestions(addressSuggestions);

      // Assuming you want to set the first suggestion as selected when typing
      if (addressSuggestions.length > 0) {
        setSelectedSuggestion(addressSuggestions[0]);
      }
    } else {
      setSuggestions([]);
      // Clear selected suggestion if the input is empty
      setSelectedSuggestion("");
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchValue(suggestion);
    setSuggestions([]);

    const accessToken = import.meta.env.VITE_REACT_MAPBOX_ACCESS_TOKEN;
    try {
      const response = await fetchMapboxAddressSuggestions(
        suggestion,
        accessToken
      );
      console.log(response[0]);
      const [lng, lat] = response[0].geometry.coordinates;
      const placeName = response[0].place_name;

      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: lat,
        longitude: lng,
      }));

      setNewAddress(placeName);
      setNewLocation({
        lat,
        lng,
      });
      setShowButton(true);

      mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
      setSearchValue("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex my-2 gap-2">
        <div
          className="left flex flex-col flex-1 gap-2"
          style={{ border: "2px solid red", height: "100%" }}
        >
          <div
            style={{ justifyContent: "flex-end" }}
            className="filter w-full flex justify-end gap-2 "
          >
            <FilterButton />
          </div>
          {currentPins.map((pin, index) => (
            <UserReview
              key={index}
              review={pin}
              setAllReviews={setAllReviews}
            />
          ))}
        </div>
        <div
          className="right flex-1 relative"
          style={{ border: "2px solid red" }}
        >
          {showButton && (
            <button
              style={{ zIndex: 1000 }}
              className="bg-gray-300 absolute top-2 left-2 py-2 px-8 rounded-lg"
              onClick={handleAddReviewButtonClick} // Add onClick handler
            >
              + Add Review
            </button>
          )}
          <form action="" className="z-50 absolute top-2 right-2 bg-gray-300">
            <div className="flex items-center bg-white border-1 border-gray-50">
              <input
                type="search"
                name=""
                id=""
                value={searchValue}
                className="px-4 py-2 outline-"
                placeholder="Search..."
                onChange={handleInputChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 text-gray-500 bg-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchValue.trim() !== "" && suggestions.length > 0 && (
              <ul className="bg-white px-2 w-full">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="cursor-pointer w-full hover:bg-gray-200"
                  >
                    <div className="suggestion-name">
                      {suggestion && suggestion.length > 12
                        ? suggestion.slice(0, 29) + "..."
                        : suggestion}
                    </div>
                    {/* <div className="review-count">
                   
                      <Rating
                        name="half-rating-read"
                        value={reviewCounts[suggestion]}
                        defaultValue={0}
                        precision={0.5}
                        readOnly
                      />
                    </div> */}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <MapComponent
            pins={currentPins}
            setShowButton={setShowButton}
            openAddReviewModal={isAddReviewModalOpen} // Pass state to the MapComponent
            setNewAddress={setNewAddress}
            setNewLocation={setNewLocation}
            viewport={viewport} // Pass the viewport state
            setViewport={setViewport} // Pass the setViewport function
            mapRef={mapRef}
          />
          {showButton && (
            <AddNewReviewModal
              open={isAddReviewModalOpen}
              onClose={handleAddReviewModalClose}
              newAddress={newAddress}
              newLocation={newLocation}
              setAllReviews={setAllReviews}
              setShowButton={setShowButton}
            />
          )}
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <Pagination
          count={Math.ceil(allReviews.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ReviewMapSection;
