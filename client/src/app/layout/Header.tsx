import { SetMealRounded } from "@mui/icons-material";
import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

interface Props {
  setDarkMode: (e: any) => void;
}

const Header = ({ setDarkMode }: Props) => {
  const setMode = (e: any) => {
    setDarkMode(e.target.checked);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">E-Commerce</Typography>
        <Switch onChange={setMode}></Switch>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
