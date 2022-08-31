import { Route, Routes } from "react-router-dom";
import { Detail } from "./pages/Detail";
import { SearchMovie } from "./pages/Search";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchMovie />} />
      <Route path="movie/:movieId" element={<Detail />} />
    </Routes>
  );
}
