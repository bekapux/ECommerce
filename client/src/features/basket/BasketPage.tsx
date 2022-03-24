import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({
      loading: true,
      name,
    });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => {
        setStatus({
          loading: false,
          name: "",
        });
      });
  };

  const handleRemoveItem = (productId: number, name: string, quantity = 1) => {
    setStatus({
      loading: true,
      name,
    });
    agent.Basket.removeItem(productId, quantity)
      .then((basket) => removeItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => {
        setStatus({
          loading: false,
          name: "",
        });
      });
  };

  if (!basket || basket.items.length === 0)
    return <Typography variant="h3">Your Basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Qiantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row: BasketItem) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === "rem" + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(row.productId, "rem" + row.productId)
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={
                      status.loading && status.name === "add" + row.productId
                    }
                    onClick={() =>
                      handleAddItem(row.productId, "add" + row.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((row.price * row.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === "del" + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        row.productId,
                        "del" + row.productId,
                        row.quantity
                      )
                    }
                  >
                    <Delete></Delete>
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
