import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants = [] }) {
  if (!plants.length) return <p>No plants match your search.</p>;

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id ?? plant.name} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;
