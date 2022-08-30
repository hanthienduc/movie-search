import React from 'react'
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Detail } from './pages/Detail';
import { SearchMovie } from './pages/SearchMovie';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<SearchMovie />} />
        <Route path="movie/:movieId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
