import { Route, Routes } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navigation from "./pages/partials/Navigaton";
import LogoutPage from "./pages/LogoutPage";
import LocationsPage from "./pages/LocationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LocationPage from "./pages/LocationPage";
import OnboardPage from "./pages/OnboardPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

//components
import IsProtected from "./components/Utils/IsProtected";

// contexts
import FavoritesContextProvider from "./contexts/FavoritesContext";

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
              <FavoritesContextProvider>
                <ProfilePage />
              </FavoritesContextProvider>
            </IsProtected>
          }
        />
        <Route
          path="/update-profile"
          element={
            <IsProtected redirectTo="/login">
              <UpdateProfilePage />
            </IsProtected>
          }
        />

        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/register/onboard"
          element={
            <IsProtected redirectTo="/login">
              <OnboardPage />
            </IsProtected>
          }
        />
        <Route
          path="/locations"
          element={
            <IsProtected redirectTo="/login">
              <LocationsPage />
            </IsProtected>
          }
        />
        <Route
          path="/locations/:lon/:lat/"
          element={
            <IsProtected redirectTo="/login">
              <LocationPage />
            </IsProtected>
          }
        />
        {/* if user has a location saved direct it to this url instead */}
        <Route
          path="/locations/:lon/:lat/:locationId"
          element={
            <IsProtected redirectTo="/login">
              <LocationPage />
            </IsProtected>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
