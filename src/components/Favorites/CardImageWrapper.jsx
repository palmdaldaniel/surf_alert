import React from "react";
import CardMedia from "@mui/material/CardMedia";

const CardImageWrapper = ({ data, finishedLoading }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((item, i) => {
          const src = item.data();
          return (
            <CardMedia
              key={i}
              sx={{
                width: "100%",
              }}
              component="img"
              alt="green iguana"
              image={src.url}
              onLoad={() => finishedLoading(src)}
            />
          );
        })}

      {data.length < 1 && (
        <CardMedia
          sx={{
            width: "100%",
          }}
          component="img"
          alt="green iguana"
          image={
            "https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
      )}
    </>
  );
};

export default CardImageWrapper;
