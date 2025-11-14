import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  if (loading) return <Loading />

  if (!user) return <Navigate to="/login" />

  return children
}
