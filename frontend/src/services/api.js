const API_URL = "http://127.0.0.1:8000"

export async function registerUser(userData) {
  const response = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed")
  }

  return data
}


export async function loginUser(credentials) {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Login failed")
  }

  return data
}


export async function getVehicles(token) {
  const response = await fetch(
    `${API_URL}/api/vehicles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch vehicles")
  }

  return data
}

export async function searchVehicles(token, params) {
  const query = new URLSearchParams()

  if (params.make) {
    query.append("make", params.make)
  }

  if (params.model) {
    query.append("model", params.model)
  }

  if (params.category) {
    query.append("category", params.category)
  }

  if (params.min_price) {
    query.append("min_price", params.min_price)
  }

  if (params.max_price) {
    query.append("max_price", params.max_price)
  }

  const response = await fetch(
    `${API_URL}/api/vehicles/search?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Vehicle search failed"
    )
  }

  return data
}

export async function purchaseVehicle(token, vehicleId) {
  const response = await fetch(
    `${API_URL}/api/vehicles/${vehicleId}/purchase`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Purchase failed"
    )
  }

  return data
}

export async function getCurrentUser(token) {
  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to get user")
  }

  return data
}

export async function updateVehicle(token, vehicleId, vehicleData) {
  const response = await fetch(
    `${API_URL}/api/vehicles/${vehicleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update vehicle")
  }

  return data
}


export async function deleteVehicle(token, vehicleId) {
  const response = await fetch(
    `${API_URL}/api/vehicles/${vehicleId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.detail || "Failed to delete vehicle")
  }

  return true
}


export async function restockVehicle(
  token,
  vehicleId,
  quantity
) {
  const response = await fetch(
    `${API_URL}/api/vehicles/${vehicleId}/restock`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: Number(quantity),
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to restock vehicle")
  }

  return data
}