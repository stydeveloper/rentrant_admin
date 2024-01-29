import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import { useLayoutContext } from "../../components/Layout/Layout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userIsAuthenticated, setUserIsAuthenticated } = useLayoutContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    setUserIsAuthenticated(false);
    localStorage.removeItem("token");
    console.log("running logout function");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="navbar-2 w-nav">
      <div className="brand w-nav-brand w--current flex justify-between ">
        <Link to="/">
          <img
            src="/assets/logoopng.png"
            loading="lazy"
            width="130"
            alt="logo and homebutton"
            className="image-5 flex items-center justify-center"
          />
        </Link>

        <div className="flex gap-4 text-sm">
          <NavLink
            to={"/"}
            activeClassName="active-link"
            className={`text-white ${
              location.pathname === "/" && "text-black"
            }`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/admin-details"}
            activeClassName="active-link"
            className={`text-white ${
              location.pathname === "/admin-details" && "text-black"
            }`}
          >
            Admin List
          </NavLink>
          <NavLink
            to={"/user-management"}
            activeClassName="active-link"
            className={`text-white ${
              location.pathname === "/user-management" && "text-black"
            }`}
          >
            User Management
          </NavLink>
          <button
            onClick={() => {
              navigate("/", {
                state: {
                  reviewByAdmin: true,
                },
              });
            }}
            className={`text-white ${
              location.pathname === "/" && "text-black"
            }`}
          >
            Reviews by admin
          </button>
        </div>
      </div>

      <nav role="navigation" className="nav-menu w-nav-menu">
        <button
          className="about-button-navbar w-nav-link rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="hamburger">
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
          onClick={toggleMenu}
        />
      </div>

      <div
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
      >
        <Link to="/" className="menu-item">
          Home
        </Link>
        {!(location.pathname !== "/") && (
          <Link to="#review-in-a-pinch" className="menu-item">
            About
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
