import { useState } from "react"

export default function useForm(initialState = {}) {
  const [form, setForm] = useState(initialState)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = () => {
    setForm(initialState)
  }

  return {
    form,
    handleChange,
    resetForm,
    setForm
  }
}
