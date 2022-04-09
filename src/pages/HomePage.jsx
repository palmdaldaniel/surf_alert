import { useAuthContext } from "../contexts/AuthContext";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Typography variant="body1">
        Welcome to the homepage {user?.email}
      </Typography>
    </div>
  );
};

export default HomePage;
