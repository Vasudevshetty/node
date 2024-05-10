function Product({ product, setSelected }) {
  const {
    image,
    productName,
    price,
    organic,
    description,
    from,
    nutrients,
    quantity,
  } = product;
  return (
    <figure className="product">
      {organic && (
        <div className="product__organic">
          <h5>Organic</h5>
        </div>
      )}
      <a href="#" className="product__back" onClick={() => setSelected(null)}>
        <span className="emoji-left">👈</span>Back
      </a>

      <div className="product__hero">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((no) => (
          <span className={`product__emoji product__emoji--${no}`} key={no}>
            {image}
          </span>
        ))}
      </div>

      <h2 className="product__name">{productName}</h2>
      <div className="product__details">
        <p>
          <span className="emoji-left">🌍</span>
          From {from}
        </p>
        <p>
          <span className="emoji-left">💖</span>
          {nutrients}
        </p>
        <p>
          <span className="emoji-left">📦</span>
          {quantity}
          {image}
        </p>
        <p>
          <span className="emoji-left">💵</span>
          {price}$
        </p>
      </div>

      <a href="#" className="product__link">
        <span className="emoji-left">🛒</span>
        <span>Add to shopping cart ({price}$)</span>
      </a>

      <p className="product__description">{description}</p>
    </figure>
  );
}

export default Product;
