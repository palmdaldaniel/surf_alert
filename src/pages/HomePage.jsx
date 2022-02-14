import { useAuthContext } from "../contexts/AuthContext";
import Typography from "@mui/material/Typography";
import SkeletonPage from "./SkeletonPage";

const HomePage = () => {
  const { user } = useAuthContext();
  console.log(user);

 

  return (
    <div>
      <Typography variant="body1">
        Welcome to the homepage {user?.email}
      </Typography>
    </div>
  );
};

export default HomePage;
