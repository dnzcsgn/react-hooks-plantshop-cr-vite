import { useState } from "react";

function PlantCard({ plant }) {
  const [isInStock, setIsInStock] = useState(
    plant?.soldOut === true ? false : true,
  );

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {String(plant.price)}</p>

      {isInStock ? (
        <button className="primary" onClick={() => setIsInStock(false)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => setIsInStock(true)}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
