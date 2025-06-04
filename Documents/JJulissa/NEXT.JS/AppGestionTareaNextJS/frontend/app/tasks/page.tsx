//  app/tasks/page.tsx 

"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //  guardar el token en localStorage 
  function getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  // Cargar tareas 
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setError("");
    setLoading(true);
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("No se pudieron cargar las tareas");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Tarea creada correctamente");
        setForm({ title: "", description: "" });
        fetchTasks();
      } else {
        setError(data.error || "Error al crear la tarea");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return ( 

    <> 
    
      {/* Header */}
      <header className="bg-orange-600 text-white py-6 shadow-lg">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase">
            App de Gestión de Tareas
          </h1>
        </div>
      </header> 

      <main className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-orange-500">Mis Tareas</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow mb-6"
          >
            <h2 className="text-3xl  font-semibold mb-2 text-center text-cyan-600">Nueva tarea</h2>
            {error && <div className="mb-2 text-red-600">{error}</div>}
            {success && <div className="mb-2 text-green-600">{success}</div>}
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
              required
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
              rows={2}
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Crear tarea
            </button>
          </form>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-3xl font-semibold mb-4 text-center text-cyan-600">Listado de tareas</h2>
            {loading ? (
              <div>Cargando...</div>
            ) : tasks.length === 0 ? (
              <div>No hay tareas aún.</div>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="mb-2 border-b pb-2 last:border-b-0"
                  >
                    <strong>{task.title}</strong>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main> 
    </>
  );
}



