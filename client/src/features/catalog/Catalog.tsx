import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://localhost:44331/api/Products")
      .then((p) => p.json())
      .then((res: Product[]) => {
        setProducts(res);
      });
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
};

export default Catalog;
