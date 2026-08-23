const API_URL = "http://127.0.0.1:8000";

export async function getVehicles() {
  const response = await fetch(`${API_URL}/api/vehicles`);

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return response.json();
}