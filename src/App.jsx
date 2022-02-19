import { Route, Routes } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navigation from "./pages/partials/Navigaton";
import LogoutPage from "./pages/LogoutPage";
import SpotsPage from "./pages/SpotsPage";
import NotFoundPage from "./pages/NotFoundPage";

//components
import IsProtected from "./components/IsProtected";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <IsProtected redirectTo="/login">
              <HomePage />
            </IsProtected>
          }
        />
        <Route
          path="/profile"
          element={
            <IsProtected redirectTo="/login">
              <ProfilePage />
            </IsProtected>
          }
        />

        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/spots" element={<SpotsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
