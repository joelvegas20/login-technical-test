// Third Party Imports.
import Cookies from "universal-cookie";
import { useLocation } from "wouter";
import React from "react";

// Cookie instance.
const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({ component: Component, ...rest }) {
  // Get location from wouter
  const [location, setLocation] = useLocation();
  
  // gets token from cookie (if there is one )
  const token = cookies.get("token");

  // Check if there is a token and if there is not, redirect to login.
  if (!token && location !== "/login" && location !== "/register") {
    setLocation("/login");
    return null;
  }
  // If there is a token, render the component.
  if (token) {
    return <Component {...rest} />;
  }
}
