"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
        setForm({ username: "", password: "" });
      } else {
        setError(data.error || "Error al registrar");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    }
    setLoading(false);
  };

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

      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Registro</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <p className="mt-4 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-orange-600 underline">
              Inicia sesión
            </a>
          </p>
        </form>
      </main> 

      {/* Footer */}
      <footer className="bg-gradient-to-r from-fuchsia-700 via-orange-700 to-cyan-400 py-4 mt-8 shadow-inner">
        <div className="container mx-auto text-center">
          <span className="text-white font-bold text-lg">
            © {new Date().getFullYear()} App de Gestión de Tareas | Creado por JJulissa
          </span>
        </div>
      </footer> 
    </>
  );
}
