// NotFoundPage.js

import "./NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="utility-page-wrap">
      <h2 className="heading-4">404</h2>
      <h2 className="heading-3">Looks like you got lost on the way</h2>
      <div className="text-block mt-2 text-xl">
        Take me{" "}
        <Link to={"/"} className="_404-home-link">
          <span className="home-link-for-404 ">Home</span>
        </Link>
      </div>
      <div className="container-6 w-container">
        <img
          src="/assets/undraw_road_sign_re_3kc3.svg" // Update the path as per your project structure
          loading="lazy"
          alt=""
          className="image-6"
        />
      </div>
      <div className="utility-page-content"></div>
    </div>
  );
};

export default NotFoundPage;
