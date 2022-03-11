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

import { useAuthContext } from "../../contexts/AuthContext";

const ResponsiveAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthContext();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
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
              open={isOpen}
              onClose={toggleDrawer}
            >
              {user && (
                <Box onClick={toggleDrawer} sx={{ width: 250 }}>
                  <MenuItem>
                    <Typography as={Link} to="/locations" textAlign="center">
                      Locations
                    </Typography>
                  </MenuItem>
                </Box>
              )}
              {user && (
                <Box onClick={toggleDrawer} sx={{ width: 250 }}>
                  <MenuItem>
                    <Typography as={Link} to="/profile" textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>
                </Box>
              )}
              <Box onClick={toggleDrawer} sx={{ width: 250 }}>
                <MenuItem>
                  <Typography
                    as={Link}
                    to={user ? "/logout" : "login"}
                    textAlign="center"
                  >
                    {user ? "Logout" : "Login"}
                  </Typography>
                </MenuItem>
              </Box>
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
            {user && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/locations">Locations</Link>
              </Button>
            )}

            {user && (
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/profile">Profile</Link>
              </Button>
            )}

            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link to={user ? "/logout" : "login"}>
                {user ? "Logout" : "Login"}
              </Link>
            </Button>
          </Box>
          {/* Navigation for normal menu end */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
