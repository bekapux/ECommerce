import { Delete } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";

const BasketPage = () => {
  const { basket } = useStoreContext();
  if (!basket)
    return <Typography variant="h3">Your Basket is empty</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qiantity</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell align="right">
                ${(row.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                ${((row.price * row.quantity) / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketPage;
