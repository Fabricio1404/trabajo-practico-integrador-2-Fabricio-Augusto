import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          navigate("/login")
        }
      } catch {
        navigate("/login")
      }
      setLoading(false)
    }
    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      credentials: "include"
    })
    navigate("/login")
  }

  if (loading) return <Loading />

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-white shadow-lg p-6 rounded w-96 border">
        <h2 className="text-2xl font-semibold mb-4">Perfil del Usuario</h2>

        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nombre:</strong> {user.firstname}</p>
        <p><strong>Apellido:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <button 
          className="w-full bg-gray-900 text-white py-2 mt-6 rounded"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
