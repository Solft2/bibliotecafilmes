import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import Search from './pages/Search.jsx';
import Populares from './pages/Populares.jsx'
import Aleatorio from './pages/Aleatorio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App será o layout para todas as rotas abaixo */}
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="search" element={<Search />} />
          <Route path="populares" element={<Populares />}/>
          <Route path = "aleatorio" element = {<Aleatorio/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
