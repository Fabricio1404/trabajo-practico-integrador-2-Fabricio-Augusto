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
    <div className="w-full flex justify-center mt-20">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 border"
      >
        <h2 className="text-2xl font-semibold mb-4">Registrarse</h2>

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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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

        <input 
          type="text"
          name="firstname"
          placeholder="Nombre"
          value={form.firstname}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input 
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={form.lastname}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input 
          type="text"
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button className="w-full bg-gray-900 text-white py-2 rounded">
          Registrarme
        </button>

        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
