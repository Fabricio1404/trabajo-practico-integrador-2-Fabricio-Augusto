import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import useForm from "../hooks/useForm"
import Loading from "../components/Loading"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      form.username.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.firstname.trim() === "" ||
      form.lastname.trim() === "" ||
      form.dni.trim() === ""
    ) {
      setError("Complete todos los campos")
      return
    }

    setLoading(true)
    setError("")

    

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        setError("No se pudo registrar el usuario")
        setLoading(false)
        return
      }

      navigate("/home")
    } catch {
      setError("Error en el servidor")
    }

    setLoading(false)
  }

  if (loading) return <Loading />

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Crear cuenta</h2>

          {error && (
            <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">{error}</p>
          )}

          <div className="space-y-4">
            <input 
              type="text"
              name="username"
              placeholder="Usuario"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input 
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input 
              type="text"
              name="firstname"
              placeholder="Nombre"
              value={form.firstname}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input 
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={form.lastname}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input 
              type="text"
              name="dni"
              placeholder="DNI"
              value={form.dni}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-300">
            Registrarme
          </button>

          <p className="mt-6 text-center text-sm text-zinc-400">
            ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400 hover:underline">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
