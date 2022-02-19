import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";

const isLoggedIn = true;

const pages = [
  { page: "Page 1", path: "/" },
  { page: "Page 2", path: "/" },
  { page: isLoggedIn ? "Logout" : "Login", path: "/profile" },
];

const ResponsiveAppBar = () => {
  const [state, setState] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Navigation for hamburger menu start */}
          <Box
            className="navigation-icon"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={toggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              sx={{
                display: { md: "none" },
              }}
              anchor={"right"}
              open={state}
              onClose={toggleDrawer}
            >
              {pages.map((page, i) => (
                <Box key={i} onClick={toggleDrawer} sx={{ width: 250 }}>
                  <MenuItem>
                    <Typography as={Link} to={page.path} textAlign="center">
                      {page.page}
                    </Typography>
                  </MenuItem>
                </Box>
              ))}
            </Drawer>
          </Box>

          {/* Navigation for hamburger menu end */}

          {/* Navigation for normal menu start */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {pages.map((page, i) => (
              <Button key={i} sx={{ my: 2, color: "white", display: "block" }}>
                <Link to={page.path}>{page.page}</Link>
              </Button>
            ))}
          </Box>
          {/* Navigation for normal menu end */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
