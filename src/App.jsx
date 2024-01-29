import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "./pages/UsersDetail/UserDetails.jsx";
import ForgotPassword from "./pages/forgotPassword/forgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import UserManagement from "./pages/UserManagement/UserManagement.jsx";
import AdminDetails from "./pages/AdminDetails/AdminDetails.jsx";
// import { useEffect, useState } from "react";
import { useLayoutContext } from "./components/Layout/Layout.jsx";

function App() {
  // const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // const token = localStorage.getItem("token");
  //   // setUserIsAuthenticated(!!token);
  // }, []);
  const { userIsAuthenticated } = useLayoutContext();

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={
              !userIsAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            path="/user-management"
            element={
              !userIsAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <UserManagement />
              )
            }
          />
          <Route
            path="/user-details"
            element={
              !userIsAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <UserDetails />
              )
            }
          />
          <Route
            path="/admin-details"
            element={
              !userIsAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <AdminDetails />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="/login"
          element={
            userIsAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token?" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
