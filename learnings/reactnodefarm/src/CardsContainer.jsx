export default function CardsContainer({ products, setSelectedProduct }) {
  return (
    <div className="cards-container">
      {products.map((product) => (
        <Card
          product={product}
          key={product.id}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
}

function Card({ product, setSelectedProduct }) {
  const { image, productName, price, organic } = product;
  return (
    <figure className="card" onClick={() => setSelectedProduct(product)}>
      <div className="card__emoji">{image}</div>
      <div className="card__title-box">
        <h2 className="card__title">{productName}</h2>
      </div>
      <div className="card__details">
        {organic && (
          <div className="card__details-box">
            <h6 className="card__detail card__detail--organic">Organic!</h6>
          </div>
        )}
        <div className="card__details-box">
          <h6 className="card__detail">{image}</h6>
        </div>
        <div className="card__details-box">
          <h6 className="card__detail card__detail--price">{price}$</h6>
        </div>
      </div>
      <a href="#" className="card__link">
        <span>
          Detail <i className="emoji-right">👉</i>
        </span>
      </a>
    </figure>
  );
}
