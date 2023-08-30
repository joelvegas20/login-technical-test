
import { useSelector } from "react-redux";
import { useLocation } from "wouter";




export const ProtectedRoute = ({ component: Component, ...props }) => {

  const token = useSelector(state => state.userData.token);
  const isLoggedIn = token !== "";
  console.log(isLoggedIn);
  const [location, setLocation] = useLocation();

  // Si el usuario no está autenticado y la ruta actual distinta de /login y /register
  if (!isLoggedIn && location !== "/login" && location !== "/register") {
    setLocation('/login');
    return null;
  }

  if(isLoggedIn) {
    return <Component {...props} />;
  }

  return null;
};
  