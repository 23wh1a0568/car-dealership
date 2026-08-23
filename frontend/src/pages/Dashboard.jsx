import { useEffect, useState } from "react"
import {
  getVehicles,
  searchVehicles,
  purchaseVehicle,
  getCurrentUser
} from "../services/api"

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [user, setUser] = useState(null)

  async function loadVehicles() {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        setError("Please login first")
        return
      }
      const currentUser = await getCurrentUser(token)
      setUser(currentUser)
      const data = await getVehicles(token)
      setVehicles(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  async function handleSearch() {
    try {
        setLoading(true)
        setError("")

        const token = localStorage.getItem("token")

        const data = await searchVehicles(token, {
        make: search,
        category: category
        })

        setVehicles(data)
    } catch (error) {
        setError(error.message)
    } finally {
        setLoading(false)
    }
  }
  async function handlePurchase(vehicleId) {
    try {
        const token = localStorage.getItem("token")

        await purchaseVehicle(token, vehicleId)

        await loadVehicles()

    } catch (error) {
        setError(error.message)
    }
  }
  useEffect(() => {
    loadVehicles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading vehicles...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Car Dealership
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

        <h2 className="text-3xl font-bold text-gray-900">
          Vehicle Inventory
        </h2>

        <p className="text-gray-600 mt-2">
          Browse available vehicles
        </p>
            {user && (
            <p className="text-sm text-gray-500 mt-1">
                Logged in as: {user.role}
            </p>
            )}
        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                type="text"
                placeholder="Search by make..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="border rounded-lg px-4 py-3"
                />

                <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="border rounded-lg px-4 py-3"
                >
                <option value="">All Categories</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
                </select>

                <button
                onClick={handleSearch}
                className="bg-black text-white rounded-lg px-4 py-3 font-semibold"
                >
                Search
                </button>

            </div>

            </div>

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {vehicles.length === 0 && !error && (
          <div className="mt-8 bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No vehicles available.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <div className="flex justify-between items-start">

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

              <div className="mt-6">

                <p className="text-2xl font-bold">
                  ${vehicle.price.toLocaleString()}
                </p>

                <p className="text-gray-600 mt-2">
                  Stock: {vehicle.quantity}
                </p>

              </div>

              <button
                disabled={vehicle.quantity === 0}
                onClick={() => handlePurchase(vehicle.id)}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {vehicle.quantity === 0
                  ? "Out of Stock"
                  : "Purchase"}
              </button>

            </div>
          ))}

        </div>

      </main>

    </div>
  )
}

export default Dashboard