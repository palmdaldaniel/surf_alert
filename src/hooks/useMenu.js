import { useState } from "react";

const useMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setMenuIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuIsOpen(false);
    setAnchorEl(null);
  };

  return { anchorEl, menuIsOpen, openMenu, closeMenu };
};

export default useMenu;
