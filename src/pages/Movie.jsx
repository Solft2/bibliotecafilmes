import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./details.css";
import { BsWallet2, BsGraphUp, BsHourglassSplit, BsCalendarEvent, BsFillFileTextFill } from 'react-icons/bs';
import { IoMdFilm } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data); 
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}&append_to_response=credits`;
    getMovie(movieUrl);
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="movie-page">
      <MovieCard movie={movie} showLink={false} />
      <div className="info">
        <h3><BsWallet2 /> Orçamento</h3>
        <p>{movie.budget}</p>
       
        <h3><BsGraphUp /> Lucro</h3>
        <p>{movie.revenue}</p>
    
        <h3><BsHourglassSplit /> Duração</h3>
        <p>{movie.runtime} minutos</p>
   
        <h3><IoMdFilm /> Título Original</h3>
        <p>{movie.original_title}</p>
    
        <h3><BsCalendarEvent /> Data de Lançamento</h3>
        <p>{new Date(movie.release_date).toLocaleDateString()}</p>

        <h3><BsFillFileTextFill /> Resumo</h3>
        <p>{movie.overview}</p>
    
        <h3>Gêneros</h3>
        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>

        <h3><FaUserAlt /> Elenco</h3>
        <div className="cast">
          {movie.credits.cast.slice(0, 5).map(actor => (
            <div key={actor.id} className="actor">
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
