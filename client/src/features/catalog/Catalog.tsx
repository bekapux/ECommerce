import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    agent.Catalog.list().then((products: Product[]) => setProducts(products));
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
};

export default Catalog;
