import { useEffect, useState, useMemo } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const BASE_URL = "http://localhost:6001";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/plants`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch plants (${r.status})`);
        return r.json();
      })
      .then((data) => {
        const incoming = Array.isArray(data) ? data : [];
        setPlants((prev) => {
          const seen = new Set(prev.map((p) => p.name));
          return [...prev, ...incoming.filter((p) => !seen.has(p.name))];
        });
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  //Filtered plants list
  const filteredPlants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return plants;
    return plants.filter((p) => p.name?.toLowerCase().includes(q));
  }, [plants, searchQuery]);

  // New plant addition
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  return (
    <main>
      <NewPlantForm baseUrl={BASE_URL} onAddPlant={handleAddPlant} />

      <Search value={searchQuery} onSearchChange={setSearchQuery} />

      {isLoading && <p>Loading plants…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && <PlantList plants={filteredPlants} />}
    </main>
  );
}

export default PlantPage;
