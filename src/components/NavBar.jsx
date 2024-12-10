import {Link, useNavigate} from "react-router-dom";
import{useState} from "react"
import {BiCameraMovie, BiSearchAlt2} from 'react-icons/bi';
import "./NavBar.css"
const NavBar = () =>{
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!search) return;

        navigate(`/search?q=${search}`);
        setSearch("");
    }
 
    return(
        <nav id= "navbar">
        <h2>
          <Link to="/">
          <BiCameraMovie/>Biblioteca de filmes
          </Link>
        </h2>
        <h2>
          <Link to="/populares">
          Filmes populares
          </Link>
        </h2>
        <h2>
          <Link to="/aleatorio">
          Filmes aleatorios
          </Link>
        </h2>
         <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder= "Busque um filme" 
          onChange={(e)=> setSearch(e.target.value)}
          value = {search}/>
          <button type = "submit"></button>
           <BiSearchAlt2/>
         </form>
      </nav>
    )
    
}
export default NavBar