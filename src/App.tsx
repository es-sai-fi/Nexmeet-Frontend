import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Login from "./views/login";
import Register from "./views/register";
import Meeting from "./views/meeting";

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme;
    }

    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Theme changed to:", theme);
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);

    if (process.env.NODE_ENV === "development") {
      console.log(
        "HTML classes:",
        document.documentElement.classList.toString(),
      );
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Landing theme={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
