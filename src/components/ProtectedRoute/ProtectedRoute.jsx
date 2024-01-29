// import React from "react";
// import { Route, useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ element, authenticated, ...rest }) => {
//   const navigate = useNavigate();

//   if (authenticated) {
//     return <Route {...rest} element={element} />;
//   } else {
//     // Redirect to login and replace the current entry in the history
//     navigate("/login", { replace: true });
//     return null;
//   }
// };

// export default ProtectedRoute;
