import { useEffect, useState } from "react"
import Loading from "../components/Loading"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileRes = await fetch("http://localhost:3000/api/profile", {
          credentials: "include"
        })
        const tasksRes = await fetch("http://localhost:3000/api/tasks-by-user", {
          credentials: "include"
        })

        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setUser(profileData)
        }

        if (tasksRes.ok) {
          const taskData = await tasksRes.json()
          setTasks(taskData)
        }
      } catch {}
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) return <Loading />

  const total = tasks.length
  const completadas = tasks.filter(t => t.is_completed).length
  const pendientes = total - completadas

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold mb-6">
        Bienvenido, {user.firstname}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">

        <div className="bg-white border shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Total de tareas</h2>
          <p className="text-4xl mt-2">{total}</p>
        </div>

        <div className="bg-white border shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Completadas</h2>
          <p className="text-4xl mt-2">{completadas}</p>
        </div>

        <div className="bg-white border shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Pendientes</h2>
          <p className="text-4xl mt-2">{pendientes}</p>
        </div>

      </div>

      <button
        onClick={() => window.location.href = "/tasks"}
        className="bg-gray-900 text-white px-6 py-3 rounded mt-10"
      >
        Ir a mis tareas
      </button>
    </div>
  )
}
