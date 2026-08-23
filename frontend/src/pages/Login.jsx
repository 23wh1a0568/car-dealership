import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/api"
import { jwtDecode } from "jwt-decode"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")

    try {
      const data = await loginUser({
        email,
        password,
      })
      localStorage.setItem("token", data.access_token)

      const decoded = jwtDecode(data.access_token)

      if (decoded.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Car Dealership
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to your account
        </p>

        {error && (
          <div className="mt-5 bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold text-black hover:underline"
          >
            Register
          </button>
        </p>

      </div>

    </div>
  )
}

export default Login