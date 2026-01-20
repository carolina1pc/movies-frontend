"use client";
import { useEffect, useState } from "react";

interface Movie {
  _id?: string;
  title: string;
  description: string;
  year: number;
  imageUrl?: string;
  tmdbId?: string;
}

export default function MovieProject() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State pentru formular
  const [formData, setFormData] = useState({ title: "", description: "", year: 2024, tmdbId: "" });

  const API_URL = "https://movies-backend-api-t1sz.onrender.com/api/movies";

  // 1. Funcția de citire (GET)
  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
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
        setFormData({ title: "", description: "", year: 2024, tmdbId: "" }); // Reset formular
        fetchMovies(); // Reîmprospătăm lista
      }
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          🎬 Movie Database <span className="text-blue-500">Project</span>
        </h1>

        {/* Formular de adăugare editat */}
<div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl border border-slate-700 mb-12">
  <h2 className="text-xl font-semibold mb-4 text-blue-400">Adaugă un film nou</h2>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <input
      type="text"
      placeholder="Titlu film"
      className="bg-[#334155] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-white"
      value={formData.title}
      onChange={(e) => setFormData({...formData, title: e.target.value})}
      required
    />
    <input
      type="text"
      placeholder="Scurtă descriere"
      className="bg-[#334155] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-white"
      value={formData.description}
      onChange={(e) => setFormData({...formData, description: e.target.value})}
    />
    {/* CÂMPUL NOU PENTRU TMDB ID */}
    <input
      type="text"
      placeholder="TMDB ID (ex: 157336)"
      className="bg-[#334155] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-white"
      value={formData.tmdbId}
      onChange={(e) => setFormData({...formData, tmdbId: e.target.value})}
      required
    />
    <div className="flex gap-2">
      <input
        type="number"
        className="bg-[#334155] border-none rounded-lg p-3 w-full text-white"
        value={formData.year}
        onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})}
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
        Salvează
      </button>
    </div>
  </form>
</div>

        {/* Lista de filme */}
        <div className="grid grid-cols-1 gap-6">
  {loading ? (
    <p className="text-center animate-pulse text-white">Se încarcă filmele de pe Render...</p>
  ) : movies && movies.length > 0 ? (
    movies.map((movie) => (
      <div 
        key={movie._id || Math.random()} 
        className="bg-[#1e293b] p-5 rounded-xl border border-slate-800 flex flex-col gap-4 hover:bg-[#243347] transition-all"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">{movie.title || "Titlu Lipsă"}</h3>
            <p className="text-slate-400">{movie.description || "Fără descriere"}</p>
          </div>
          <span className="text-blue-500 font-mono font-bold bg-blue-500/10 px-3 py-1 rounded-lg">
            {movie.year || "N/A"}
          </span>
        </div>

        {/* --- PLAYERUL VIDEO CU VERIFICARE DE SIGURANȚĂ --- */}
        {movie && movie.tmdbId ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
            <iframe
              src={`https://vidlink.pro/movie/${movie.tmdbId}`}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        ) : (
          <div className="bg-slate-900/50 p-4 rounded text-center text-slate-500 italic">
            Acest film nu are un ID de streaming valid.
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-center text-slate-500">Nu am găsit niciun film. Adaugă unul folosind formularul de mai sus!</p>
  )}
</div>
      </div>
    </main>
  );
}