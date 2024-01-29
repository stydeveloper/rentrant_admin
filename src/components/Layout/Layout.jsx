import React, { createContext, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

// Create a context
const LayoutContext = createContext();

// Create a provider component
export const LayoutProvider = ({ children }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  return (
    <LayoutContext.Provider
      value={{ userIsAuthenticated, setUserIsAuthenticated }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook to use the context
export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

// Layout.jsx
const Layout = () => {
  // Wrap your Layout component with the LayoutProvider
  return (
    <LayoutProvider>
      <div className="layout-container pb-4">
        <Navbar />
        <main>
          {/* Render Outlet so that child components can be rendered */}
          <Outlet />
        </main>
      </div>
    </LayoutProvider>
  );
};

export default Layout;
