import React from "react";

// mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FavoritesCard = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        image="https://images.unsplash.com/photo-1591630866811-eceedf667541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Button
          sx={{
            pl: 0,
          }}
          size="small"
        >
          Go To Spot
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoritesCard;
