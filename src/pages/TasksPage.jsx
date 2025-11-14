import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import useForm from "../hooks/useForm"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const { form, handleChange, resetForm, setForm } = useForm({
    title: "",
    description: "",
    is_completed: false
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks-by-user", {
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          setTasks(data)
        } else {
          setTasks([])
        }
      } catch {
        setTasks([])
      }
      setLoading(false)
    }
    fetchTasks()
  }, [])

  const createTask = async () => {
    if (form.title.trim() === "" || form.description.trim() === "") return

    setSaving(true)

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        const newTask = await res.json()
        setTasks([...tasks, newTask])
        resetForm()
      }
    } catch {}

    setSaving(false)
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed
    })
  }

  const updateTask = async () => {
    if (!editingId) return
    if (form.title.trim() === "" || form.description.trim() === "") return

    setSaving(true)

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${editingId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        const updated = await res.json()
        const newList = tasks.map((t) =>
          t.id === editingId ? updated : t
        )
        setTasks(newList)
        setEditingId(null)
        resetForm()
      }
    } catch {}

    setSaving(false)
  }

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar tarea?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (res.ok) {
        const newList = tasks.filter((t) => t.id !== id)
        setTasks(newList)
      }
    } catch {}
  }

  const toggleCompleted = async (task) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          is_completed: !task.is_completed
        })
      })

      if (res.ok) {
        const updated = await res.json()
        const newList = tasks.map((t) =>
          t.id === task.id ? updated : t
        )
        setTasks(newList)
      }
    } catch {}
  }

  if (loading) return <Loading />

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex-grow flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Mis Tareas</h2>

      <div className="bg-zinc-900 border border-zinc-800 shadow-lg p-6 rounded-lg mb-10">
        <h3 className="text-xl font-semibold mb-4 text-white">
          {editingId ? "Editar tarea" : "Crear tarea"}
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título de la tarea"
            className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Descripción..."
            className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={form.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center gap-2 text-zinc-400">
            <input
              type="checkbox"
              name="is_completed"
              className="h-4 w-4 rounded bg-zinc-700 border-zinc-600 text-indigo-600 focus:ring-indigo-500"
              checked={form.is_completed}
              onChange={(e) =>
                setForm({ ...form, is_completed: e.target.checked })
              }
            />
            Completada
          </label>

          <div className="flex gap-2">
            {editingId && (
              <button
                className="bg-zinc-600 text-white py-2 px-4 rounded-md hover:bg-zinc-700 transition-colors"
                onClick={() => {
                  resetForm()
                  setEditingId(null)
                }}
              >
                Cancelar
              </button>
            )}
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
              onClick={editingId ? updateTask : createTask}
              disabled={saving}
            >
              {saving ? (editingId ? "Actualizando..." : "Guardando...") : (editingId ? "Actualizar" : "Guardar")}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 px-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-lg">No tienes tareas pendientes.</p>
            <p className="text-zinc-500">Crea una nueva para empezar.</p>
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className={`bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex justify-between items-center transition-all ${
                t.is_completed ? "opacity-50" : "hover:border-zinc-700"
              }`}
            >
              <div className={t.is_completed ? "line-through text-zinc-500" : "text-white"}>
                <h4 className="font-semibold text-lg">{t.title}</h4>
                <p className="text-sm text-zinc-400">{t.description}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button
                  className={`p-2 rounded-md transition-colors ${t.is_completed ? "text-yellow-400 hover:bg-zinc-800" : "text-green-400 hover:bg-zinc-800"}`}
                  onClick={() => toggleCompleted(t)}
                >
                  {t.is_completed ? "Pendiente" : "Completar"}
                </button>
                <button
                  className="p-2 text-blue-400 rounded-md hover:bg-zinc-800 transition-colors"
                  onClick={() => startEdit(t)}
                >
                  Editar
                </button>
                <button
                  className="p-2 text-red-400 rounded-md hover:bg-zinc-800 transition-colors"
                  onClick={() => deleteTask(t.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
