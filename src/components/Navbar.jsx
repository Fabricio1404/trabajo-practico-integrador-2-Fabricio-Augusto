import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)   
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", { credentials: "include" })
    navigate("/login")
  }

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Mi App</h1>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
