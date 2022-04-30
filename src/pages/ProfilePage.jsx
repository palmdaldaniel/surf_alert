import UserInfo from "../components/UserInfo";
import FavoritesWrapper from "../components/Favorites/FavoritesWrapper";

import { useAuthContext } from "../contexts/AuthContext";
import { useFavoritesContext } from "../contexts/FavoritesContext";

import Alert from "@mui/material/Alert";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const { counter } = useFavoritesContext();

  return (
    <div>
      {counter > 0 && (
        <Alert
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          severety={"success"}
        >
          {counter} spot(s) is firing right now 🔥
        </Alert>
      )}
      <UserInfo user={user} />
      <FavoritesWrapper />
    </div>
  );
};

export default ProfilePage;
