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
    <div className="w-full flex flex-col items-center mt-10">

      <h2 className="text-2xl font-semibold mb-6">Tareas</h2>

      <div className="bg-white border shadow p-6 rounded w-96 mb-10">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Editar tarea" : "Crear tarea"}
        </h3>

        <input
          type="text"
          name="title"
          placeholder="Título"
          className="border w-full p-2 mb-3"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          className="border w-full p-2 mb-3"
          value={form.description}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            name="is_completed"
            checked={form.is_completed}
            onChange={(e) =>
              setForm({ ...form, is_completed: e.target.checked })
            }
          />
          Completada
        </label>

        {editingId ? (
          <button
            className="w-full bg-blue-700 text-white py-2 rounded"
            onClick={updateTask}
            disabled={saving}
          >
            {saving ? "Actualizando..." : "Actualizar tarea"}
          </button>
        ) : (
          <button
            className="w-full bg-gray-900 text-white py-2 rounded"
            onClick={createTask}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar Tarea"}
          </button>
        )}

        <button
          className="w-full bg-gray-500 text-white py-2 rounded mt-3"
          onClick={() => {
            resetForm()
            setEditingId(null)
          }}
        >
          Limpiar
        </button>
      </div>

      <div className="w-full max-w-xl">
        {tasks.length === 0 ? (
          <p>No hay tareas cargadas.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((t) => (
              <li
                key={t.id}
                className={`border p-4 bg-white shadow rounded flex justify-between items-center ${
                  t.is_completed ? "line-through opacity-70" : ""
                }`}
              >
                <div>
                  <h4 className="font-semibold">{t.title}</h4>
                  <p className="text-sm">{t.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => toggleCompleted(t)}
                  >
                    {t.is_completed ? "Desmarcar" : "Completar"}
                  </button>

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => startEdit(t)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteTask(t.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}
