import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css"; // Import CSS file for styling

const NavBar = () => {
  // State to manage the visibility of the mobile menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Function to toggle the visibility of the mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
      <nav className="navbar">
        {/* Render navigation links */}
        <ul className={`navbar-list ${showMobileMenu ? "show-mobile-menu" : ""}`}>
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/review" className="navbar-link">
              Review
            </Link>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;