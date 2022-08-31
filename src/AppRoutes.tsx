import { Route, Routes } from "react-router-dom";
import { Detail } from "./pages/Detail/Detail";
import { Favorite } from "./pages/Favorite/Favorite";
import { SearchMovie } from "./pages/Search/Search";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchMovie />} />
      <Route path="favorite" element={<Favorite />} />
      <Route path="movie/:movieId" element={<Detail />} />
    </Routes>
  );
}
