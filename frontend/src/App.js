// Third Party Imports.
import { Router, Route } from "wouter";

// Local Imports.
import ProtectedRoutes from "./hooks/protectedRoute";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";

// Principal App Component.
function App() {
  return (
    <>
      {/* Router for Simple Managment */}
      <Router>
        {/* Home Route */}
        <ProtectedRoutes path="/" component={HomePage} />
        {/* Register Route */}
        <Route path="/register" component={RegisterPage} />
        {/* Login Route */}
        <Route path="/login" component={LoginPage} />
      </Router>
    </>
  );
}

// Export App Component.
export default App;
