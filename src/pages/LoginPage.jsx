import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import useForm from "../hooks/useForm"
import Loading from "../components/Loading"

export default function LoginPage({onLoginSuccess}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { form, handleChange } = useForm({
    username: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.username.trim() === "" || form.password.trim() === "") {
      setError("Complete todos los campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        setError("Credenciales incorrectas")
        setLoading(false)
        return
      }
onLoginSuccess()
      navigate("/home")
    } catch {
      setError("Error en el servidor")
    }

    setLoading(false)
  }

  if (loading) return <Loading />

  return (
    <div className="w-full flex justify-center mt-20">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 border"
      >
        <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>

        {error && (
          <p className="text-red-600 mb-3">{error}</p>
        )}

        <input 
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input 
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button className="w-full bg-gray-900 text-white py-2 rounded">
          Ingresar
        </button>

        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600">Registrate</Link>
        </p>
      </form>
    </div>
  )
}
