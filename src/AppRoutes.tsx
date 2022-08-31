import { Route, Routes } from "react-router-dom";
import { Detail } from "./pages/Detail";
import { Favorite } from "./pages/Favorite";
import { SearchMovie } from "./pages/Search";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchMovie />} />
      <Route path="favorite" element={<Favorite />} />
      <Route path="movie/:movieId" element={<Detail />} />
    </Routes>
  );
}
