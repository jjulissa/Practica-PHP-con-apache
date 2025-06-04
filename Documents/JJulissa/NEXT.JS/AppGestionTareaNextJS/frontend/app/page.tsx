// src/app/page.tsx  

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-fuchsia-700 via-orange-600 to-cyan-400">
      {/* Header */}
      <header className="bg-orange-600 text-white py-6 shadow-lg">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase">
            App de Gestión de Tareas
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg text-center">
          ¡Bienvenido a tu App de Gestión de Tareas!
        </h2>
        <div className="flex gap-8">
          <a
            href="/register"
            className="px-8 py-4 rounded-full bg-fuchsia-600 text-white text-xl font-bold shadow-lg hover:bg-fuchsia-800 transition-all duration-200 border-4 border-fuchsia-300"
          >
            Registrarse
          </a>
          <a
            href="/login"
            className="px-8 py-4 rounded-full bg-cyan-600 text-white text-xl font-bold shadow-lg hover:bg-cyan-800 transition-all duration-200 border-4 border-cyan-300"
          >
            Iniciar Sesión
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-fuchsia-700 via-orange-700 to-cyan-400 py-4 mt-8 shadow-inner">
        <div className="container mx-auto text-center">
          <span className="text-white font-bold text-lg">
            © {new Date().getFullYear()} App de Gestión de Tareas | Creado por JJulissa
          </span>
        </div>
      </footer> 
    </div>
  );
}


