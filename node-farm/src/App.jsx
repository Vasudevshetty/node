import { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import "./index.scss";

function App() {
  const [products, setProducts] = useState([]);

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

      <CardsContainer products={products} />
    </div>
  );
}

export default App;
