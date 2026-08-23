import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/api"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")

    try {
      await registerUser({
        username,
        email,
        password,
      })

      navigate("/login")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Join our dealership
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
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter email"
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
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Create password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-black hover:underline"
          >
            Login
          </button>
        </p>

      </div>

    </div>
  )
}

export default Register