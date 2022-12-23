import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { LoggedInContext } from '../contexts/LoggedInContext';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = React.useContext(LoggedInContext);
  return (
    <Route>
      {isLoggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  )
};

export default ProtectedRoute;