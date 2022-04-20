import { useAuthContext } from "../contexts/AuthContext";
import Typography from "@mui/material/Typography";

const HomePage = () => {
  const { user } = useAuthContext();

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    height: "10px",
    width: "10px",
    transform: `rotate(${150}deg)`,
  };
  return (
    <div>
      <Typography variant="body1">
        Welcome to the homepage {user?.email}
      </Typography>

      <div style={styles}>
        <span>&#9650;</span>
      </div>
    </div>
  );
};

export default HomePage;
