"use client";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  description: string;
  year: number;
}

export default function MovieProject() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State pentru formular
  const [formData, setFormData] = useState({ title: "", description: "", year: 2024 });

  const API_URL = "https://movies-backend-api-t1sz.onrender.com/api/movies";

  // 1. Funcția de citire (GET)
  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      console.error("Eroare:", err);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  // 2. Funcția de adăugare (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", description: "", year: 2024 }); // Reset formular
        fetchMovies(); // Reîmprospătăm lista
      }
    } catch (err) {
      console.error("Eroare la salvare:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          🎬 Movie Database <span className="text-blue-500">Project</span>
        </h1>

        {/* Formular de adăugare */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl border border-slate-700 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Adaugă un film nou</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Titlu film"
              className="bg-[#334155] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Scurtă descriere"
              className="bg-[#334155] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <div className="flex gap-2">
              <input
                type="number"
                className="bg-[#334155] border-none rounded-lg p-3 w-full"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Salvează
              </button>
            </div>
          </form>
        </div>

        {/* Lista de filme */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <p className="text-center animate-pulse">Se încarcă filmele de pe Render...</p>
          ) : (
            movies.map((movie) => (
              <div key={movie._id} className="bg-[#1e293b] p-5 rounded-xl border border-slate-800 flex justify-between items-center hover:bg-[#243347] transition-all">
                <div>
                  <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                  <p className="text-slate-400">{movie.description}</p>
                </div>
                <span className="text-blue-500 font-mono font-bold bg-blue-500/10 px-3 py-1 rounded-lg">
                  {movie.year}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}