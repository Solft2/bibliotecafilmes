import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

import "./Movie.css";

const Aleatorio = () => {
  const [movies, setMovies] = useState([]);
  const [randomId, setRandomId] = useState(null); 
  const [movieTitle, setMovieTitle] = useState(null);


  const getMovieById = async (id) => {
    try {
      const res = await fetch(`${api}${id}?${apiKey}`)
      console.log(res)
      if (!res.ok) {
        throw new Error("Falha ao buscar os dados");
      }
      const data = await res.json();
      setMovies([data]);
      setMovieTitle(data.title);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    }
  };


  const generateRandomId = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    setRandomId(randomId); 
  };

  useEffect(() => {
    if (randomId !== null) {
      getMovieById(randomId);
    } else {
      generateRandomId(); 
    }
  }, [randomId]); 

  return (
    <div className="container">
      <h2 className="title">Resultado do Filme Aleatório (Nome: {movieTitle})</h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Aleatorio;