import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function ProfilePage({ onLogout }) {
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
          setUser(data.user)
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
    onLogout();
    navigate("/login")
  }

  if (loading || !user) return <Loading />

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 flex-grow flex flex-col justify-center">
      <div className="bg-zinc-900 border border-zinc-800 shadow-lg p-8 rounded-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Perfil del Usuario</h2>

        <div className="space-y-4 text-lg text-left">
          <div className="flex border-b border-zinc-800 py-2">
            <strong className="w-32 text-zinc-400">ID:</strong>
            <span>{user.id}</span>
          </div>
          <div className="flex border-b border-zinc-800 py-2">
            <strong className="w-32 text-zinc-400">Nombre:</strong>
            <span>{user.name}</span>
          </div>
          <div className="flex border-b border-zinc-800 py-2">
            <strong className="w-32 text-zinc-400">Apellido:</strong>
            <span>{user.lastname}</span>
          </div>
          <div className="flex py-2">
            <strong className="w-32 text-zinc-400">Email:</strong>
            <span>{user.email || 'No disponible'}</span>
          </div>
        </div>

        <button 
          className="w-full bg-red-600/80 text-white py-2 mt-8 rounded-md hover:bg-red-600 transition-colors font-semibold"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
