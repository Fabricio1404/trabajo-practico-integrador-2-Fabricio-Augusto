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
          setUser(profileData.user)
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
    <main className="w-full max-w-6xl mx-auto px-4 py-10 flex-grow flex flex-col justify-center text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white">
          Bienvenido, <span className="text-indigo-400">{user ? user.name : ""}</span>
        </h1>
        <p className="text-lg text-zinc-400 mt-2">Aquí tienes un resumen de tu actividad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-indigo-500/50 transition-colors group">
          <h2 className="text-lg font-semibold text-zinc-300">Total de tareas</h2>
          <p className="text-5xl font-bold mt-2 text-indigo-400">{total}</p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-green-500/50 transition-colors group">
          <h2 className="text-lg font-semibold text-zinc-300">Completadas</h2>
          <p className="text-5xl font-bold mt-2 text-green-400">{completadas}</p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-yellow-500/50 transition-colors group">
          <h2 className="text-lg font-semibold text-zinc-300">Pendientes</h2>
          <p className="text-5xl font-bold mt-2 text-yellow-400">{pendientes}</p>
        </div>

      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => window.location.href = "/tasks"}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          Gestionar mis tareas
        </button>
      </div>
    </main>
  )
}
