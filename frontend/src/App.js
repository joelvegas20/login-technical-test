// Third Party Imports.
import { Router, Route } from 'wouter';

// Local Imports.
import { ProtectedRoute } from './hooks';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import { useSelector } from 'react-redux';

// Principal App Component.
function App() {

  const token = useSelector(state => state.token);

  return (
    <>
      {/* Router for Simple Managment */}
      <Router>
        {/* Home Route */}
        <Route path="/">
          {(params) => <ProtectedRoute component={HomePage}  {...params } token={token} />}
        </Route>
        {/* Register Route */}
        <Route path="/register" component={RegisterPage} />
        {/* Login Route */}
        <Route path="/login" component={LoginPage} />
      </Router>
    </>
  );
}

export default App;
