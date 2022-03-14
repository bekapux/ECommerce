import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponents";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
      .then((products: Product[]) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setloading(false));
  }, []);
  if (loading) return <LoadingComponent message="Loading catalog.." />;

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
};

export default Catalog;
