import UserInfo from "../components/UserInfo";
import FavoritesWrapper from "../components/FavoritesWrapper";

import { useAuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <UserInfo user={user} />
      <FavoritesWrapper />
    </div>
  );
};

export default ProfilePage;
