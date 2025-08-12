import { useState } from "react";

function NewPlantForm({ baseUrl = "http://localhost:6001", onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErr("");

    const optimistic = {
      name: name.trim(),
      image: image.trim(),
      price: price.trim(),
    };
    onAddPlant?.(optimistic);

    try {
      const res = await fetch(`${baseUrl}/plants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          image: image.trim(),

          price: price.trim(),
        }),
      });

      if (!res.ok) throw new Error(`Failed to create plant (${res.status})`);
      const created = await res.json();

      setName("");
      setImage("");
      setPrice("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add Plant"}
        </button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </div>
  );
}

export default NewPlantForm;
