import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./Movie.css";

const apiFind = import.meta.env.VITE_API_FIND; 
const apiKey = import.meta.env.VITE_API_KEY;

const Populares = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [genreId, setGenreId] = useState(28); 
  const [inputId, setInputId] = useState(""); 

  const getMoviesByGenre = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
      }
    };

    shuffleArray(data.results); 

    
    const selectedMovies = data.results.slice(0, 20);
    setActionMovies(selectedMovies); 
  };

  useEffect(() => {
    // URL dinâmica com base no genreId
    const genreMoviesUrl = `${apiFind}?${apiKey}&with_genres=${genreId}`; 
    console.log(genreMoviesUrl)
    getMoviesByGenre(genreMoviesUrl); 
  }, [genreId]);

  const handleInputChange = (event) => {
    setInputId(event.target.value); 
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const newGenreId = parseInt(inputId); 
    if (!isNaN(newGenreId)) {
      setGenreId(newGenreId); 
      setInputId(""); 
    } else {
      alert("Por favor, insira um ID válido de gênero.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Filmes Populares:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputId}
          onChange={handleInputChange}
          placeholder="Digite o ID do gênero"
        />
        <button type="submit">Buscar Filmes</button>
      </form>

      <div className="movies-container">
        {actionMovies.length > 0 &&
          actionMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Populares;