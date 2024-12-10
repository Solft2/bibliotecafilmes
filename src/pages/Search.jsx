import {useEffect,useState} from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchUrl= import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./Movie.css"

const Search = ()=>{
    const [searchParams] = useSearchParams()
    const [movies,setMovies] = useState([]);
    const query = searchParams.get("q").trim();

    const getSearchedMovie = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Falha ao buscar os dados');
            }
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            
        }
    };
 
    useEffect(()=>{
        const searchMovies = `${searchUrl}?${apiKey}&query=${query}`;
        console.log(searchMovies);
        console.log("URL da busca:", searchMovies);

        getSearchedMovie(searchMovies);
    },[query]);

    return (
    <div className = "container">
        <h2 className="title">Resultados: <span className="query-text">{query}</span> </h2>
        <div className="movies-container">
          {movies.length>0 && 
          movies.map((movie) => <MovieCard key={movie.id} movie ={movie}/>)}
        </div>
     </div>
     );
};

export default Search;