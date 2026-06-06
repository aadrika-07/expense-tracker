import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

  const [darkMode, setDarkMode] =
  useState(() => {
    const savedMode =
      localStorage.getItem("darkMode");

    return savedMode === "true";
  });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );
  
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Layout;