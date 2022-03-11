import { Container, Typography, Paper, Divider, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Not Found
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go Back to shop
      </Button>
    </Container>
  );
};

export default NotFound;
