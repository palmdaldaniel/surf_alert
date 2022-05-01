import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import favoriteImg from "../utils/images/favorite.png";
import mapImg from "../utils/images/map.png";
import chart from "../utils/images/chart.png";

const HomePage = () => {
  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
          m: "20px 0",
        }}
      >
        <Typography variant="h3">Welcome to surf alert</Typography>
        <Typography variant="subtitle1">
          A service for surfers to track wind-conditions in sweden.
        </Typography>
      </Box>
      <Box
        sx={{
          display: { sm: "flex" },
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "400px",
            margin: "20px",
          }}
        >
          <Typography variant="h5">Explore Swedens coast</Typography>
          <Typography variant="subtitle1">
            Use the map, click around and navigate to specific locations.
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            width: "400px",
            height: "100%",
          }}
          alt="A map over sweden"
          src={mapImg}
        />
      </Box>
      <Box
        sx={{
          display: { sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "400px",
            margin: "20px",
          }}
        >
          <Typography variant="h5">
            Save your favorites and get notified
          </Typography>
          <Typography variant="subtitle1">
            You can mark specific locations and specify conditions when the surf
            is good. When your specified conditions are met the app will let you
            know that it’s time to go surf.
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            width: "400px",
            height: "100%",
          }}
          alt="A breaking wave"
          src={favoriteImg}
        />
      </Box>
      <Box
        sx={{
          display: { sm: "flex" },
          flexDirection: "row-reverse",
          justifyContent: "center",
          marginBottom: "50px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "400px",
            margin: "20px",
          }}
        >
          <Typography variant="h5">7-day forecast</Typography>
          <Typography variant="subtitle1">
            Never miss a surf-opportunity. On every location, a 7 day forecast
            will display windspeed and direction.
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            width: "400px",
            height: "100%",
          }}
          alt="A chart"
          src={chart}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
