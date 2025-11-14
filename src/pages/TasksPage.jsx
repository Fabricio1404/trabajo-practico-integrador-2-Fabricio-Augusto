import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import useForm from "../hooks/useForm"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
    if (form.title.trim() === "" || form.description.trim() === "") {
      return
    }

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

  if (loading) return <Loading />

  return (
    <div className="w-full flex flex-col items-center mt-10">

      <h2 className="text-2xl font-semibold mb-6">Tareas</h2>

      <div className="bg-white border shadow p-6 rounded w-96 mb-10">
        <h3 className="text-xl font-semibold mb-4">Crear o editar tarea</h3>

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

        <button
          className="w-full bg-gray-900 text-white py-2 rounded"
          onClick={createTask}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar Tarea"}
        </button>

        <button
          className="w-full bg-gray-500 text-white py-2 rounded mt-3"
          onClick={resetForm}
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
                className="border p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{t.title}</h4>
                  <p className="text-sm">{t.description}</p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
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
