import { useEffect, useState } from "react"

import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
  restockVehicle,
} from "../services/api"

const API_URL = "http://127.0.0.1:8000"

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([])

  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [category, setCategory] = useState("Sedan")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [editingId, setEditingId] = useState(null)

  async function loadVehicles() {
    try {
      const token = localStorage.getItem("token")

      const data = await getVehicles(token)

      setVehicles(data)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  function clearForm() {
    setMake("")
    setModel("")
    setCategory("Sedan")
    setPrice("")
    setQuantity("")
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage("")
    setError("")

    try {
      const token = localStorage.getItem("token")

      const vehicleData = {
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
      }

      if (editingId) {
        await updateVehicle(
          token,
          editingId,
          vehicleData
        )

        setMessage("Vehicle updated successfully")
      } else {
        const response = await fetch(
          `${API_URL}/api/vehicles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(vehicleData),
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to create vehicle"
          )
        }

        setMessage("Vehicle created successfully")
      }

      clearForm()
      await loadVehicles()

    } catch (error) {
      setError(error.message)
    }
  }

  function handleEdit(vehicle) {
    setEditingId(vehicle.id)

    setMake(vehicle.make)
    setModel(vehicle.model)
    setCategory(vehicle.category)
    setPrice(vehicle.price)
    setQuantity(vehicle.quantity)

    setMessage("")
    setError("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  async function handleDelete(vehicleId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    )

    if (!confirmed) {
      return
    }

    try {
      setMessage("")
      setError("")

      const token = localStorage.getItem("token")

      await deleteVehicle(token, vehicleId)

      setMessage("Vehicle deleted successfully")

      await loadVehicles()

    } catch (error) {
      setError(error.message)
    }
  }

  async function handleRestock(vehicleId) {
    const quantity = window.prompt(
      "Enter quantity to restock:"
    )

    if (quantity === null) {
      return
    }

    const amount = Number(quantity)

    if (!amount || amount <= 0) {
      setError(
        "Restock quantity must be greater than zero"
      )
      return
    }

    try {
      setMessage("")
      setError("")

      const token = localStorage.getItem("token")

      await restockVehicle(
        token,
        vehicleId,
        amount
      )

      setMessage("Vehicle restocked successfully")

      await loadVehicles()

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">

        <h2 className="text-3xl font-bold">
          {editingId
            ? "Update Vehicle"
            : "Add Vehicle"}
        </h2>

        <p className="text-gray-600 mt-2">
          Manage your vehicle inventory.
        </p>

        {message && (
          <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Vehicle Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-2xl shadow-md p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Make
              </label>

              <input
                type="text"
                value={make}
                onChange={(event) =>
                  setMake(event.target.value)
                }
                placeholder="Toyota"
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Model
              </label>

              <input
                type="text"
                value={model}
                onChange={(event) =>
                  setModel(event.target.value)
                }
                placeholder="Camry"
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="Sedan">
                  Sedan
                </option>

                <option value="SUV">
                  SUV
                </option>

                <option value="Hatchback">
                  Hatchback
                </option>

                <option value="Truck">
                  Truck
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="30000"
                min="0"
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Quantity
              </label>

              <input
                type="number"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
                placeholder="5"
                min="0"
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <div className="flex gap-3 mt-6">

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
            >
              {editingId
                ? "Update Vehicle"
                : "Create Vehicle"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

        {/* Vehicle List */}

        <h2 className="text-2xl font-bold mt-10">
          Vehicle Inventory
        </h2>

        {vehicles.length === 0 ? (
          <div className="mt-6 bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No vehicles available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >

                <div className="flex justify-between">

                  <div>
                    <h3 className="text-xl font-bold">
                      {vehicle.make} {vehicle.model}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {vehicle.category}
                    </p>
                  </div>

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    #{vehicle.id}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-2xl font-bold">
                    ${vehicle.price.toLocaleString()}
                  </p>

                  <p className="text-gray-600 mt-2">
                    Stock: {vehicle.quantity}
                  </p>

                </div>

                <div className="grid grid-cols-3 gap-2 mt-6">

                  <button
                    onClick={() =>
                      handleEdit(vehicle)
                    }
                    className="bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleRestock(vehicle.id)
                    }
                    className="bg-green-600 text-white py-2 rounded-lg"
                  >
                    Restock
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(vehicle.id)
                    }
                    className="bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}

export default AdminDashboard