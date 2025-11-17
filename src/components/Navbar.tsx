import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import logo from "../assets/logo.png";
import "../styles/Navbar.scss";

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navegar a /login
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Navegar a /register
  };

  const handleNavClick = (sectionId: string) => {
    setSidebarOpen(false);
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={`navbar ${theme === "dark" ? "dark" : "light"}`}>
      <Link to="/">
        <img
          src={theme === "dark" ? assets.logo : assets.logo}
          className="navbar-logo"
          alt="Logo"
        />{" "}
      </Link>

      <div className={`navbar-links ${sidebarOpen ? "open" : ""}`}>
        <button onClick={() => handleNavClick("inicio")}>Inicio</button>
        <button onClick={() => handleNavClick("about-us")}>
          Sobre Nosotros
        </button>
      </div>

      <div className="navbar-right">
        <button id="loginButton" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
        <button id="signUpButton" onClick={handleSignUpClick}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Navbar;
