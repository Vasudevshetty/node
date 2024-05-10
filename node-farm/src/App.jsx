import { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import "./index.scss";
import Product from "./Product";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchdata();
  }, [setProducts]);

  return (
    <div className="container">
      <h1>🌽 Node Farm 🥦</h1>

      {selectedProduct ? (
        <Product product={selectedProduct} setSelected={setSelectedProduct} />
      ) : (
        <CardsContainer
          products={products}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

export default App;
