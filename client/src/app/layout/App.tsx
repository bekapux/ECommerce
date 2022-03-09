import { Container, CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import Header from "./Header";
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://localhost:44331/api/Products")
      .then((p) => p.json())
      .then((res: Product[]) => {
        setProducts(res);
      });
  }, []);

  function addProduct() {
    setProducts((prevState: Product[]) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: `product ${prevState.length + 1}`,
        description: "",
        price: (prevState.length + 1) * 100,
        pictureUrl: "",
        brand: "",
        type: "asd",
        dateCreater: "",
      },
    ]);
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </>
  );
}

export default App;
