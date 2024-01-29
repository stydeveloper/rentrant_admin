import React from "react";

const FilterButton = () => {
  return (
    <>
      <div className="relative inline-block">
        <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded inline-flex items-center">
          <span className="mr-1">Average</span>
          <svg
            className="fill-current h-4 w-4 ml-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.293l-6.646-6.647-1.414 1.414L10 14.121l8.06-8.06-1.414-1.414L10 12.293z" />
          </svg>
        </button>
        <ul className="absolute hidden text-gray-800 bg-gray-200 border border-gray-300 rounded mt-2 py-1 w-32">
          <li className="hover:bg-gray-300 px-4 py-2 cursor-pointer">
            Option 1
          </li>
          <li className="hover:bg-gray-300 px-4 py-2 cursor-pointer">
            Option 2
          </li>
          <li className="hover:bg-gray-300 px-4 py-2 cursor-pointer">
            Option 3
          </li>
        </ul>
      </div>
    </>
  );
};

export default FilterButton;
