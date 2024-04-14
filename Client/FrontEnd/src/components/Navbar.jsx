import { useState } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../../public/menu.png"; // Import the menu icon image
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
      {/* Render mobile menu icon on mobile devices */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <img src={menuIcon} alt="Menu" className="menu-icon" />
      </div>

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
      </ul>
    </nav>
  );
};

export default NavBar;
