import React, { useState } from "react";
import { getAllReviewsByLatLng, getSearchedReviews } from "../../utils/reviews";
import _debounce from "lodash/debounce";

const Searchbar = ({ setAllReviews, reviewsByAdmin }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = async (e) => {
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      // Fetch all data from the backend
      const updatedData = await getAllReviewsByLatLng();
      setAllReviews(updatedData.data.reviews);
    } else {
      debouncedSearch(e.target.value);
    }
    // Debounce the handleSearch function
  };

  // Debounce the search function with a delay of 300ms

  const handleSearch = async (value) => {
    try {
      if (reviewsByAdmin) {
        const res = await getSearchedReviews(value, true);
        setAllReviews(res.data.reviews);
      } else {
        const res = await getSearchedReviews(value, false);
        setAllReviews(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const debouncedSearch = _debounce(handleSearch, 300);

  return (
    <div className="relative flex items-center w-8/12 h-12 rounded-lg bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-400 bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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

      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-10 bg-gray-50 pl-2"
        type="text"
        id="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search something.."
      />
    </div>
  );
};

export default Searchbar;
