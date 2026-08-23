import { useEffect, useState } from "react";
import { getVehicles } from "../api/api";
import type { Vehicle } from "../types/vehicle";

function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    }

    loadVehicles();
  }, []);

  if (loading) {
    return <p>Loading vehicles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Available Vehicles</h1>

      {vehicles.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
        vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <h2>
              {vehicle.make} {vehicle.model}
            </h2>

            <p>Category: {vehicle.category}</p>
            <p>Price: ₹{vehicle.price}</p>
            <p>Quantity: {vehicle.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Vehicles;