import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">E-Commerce</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
