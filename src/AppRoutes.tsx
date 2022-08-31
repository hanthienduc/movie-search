import { Route, Routes } from "react-router-dom";
import { AnimationLayout } from "./AnimationLayout";
import { Detail } from "./pages/Detail/Detail";
import { Favorite } from "./pages/Favorite/Favorite";
import { SearchMovie } from "./pages/Search/Search";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AnimationLayout />}>
        <Route path="/" element={<SearchMovie />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="movie/:movieId" element={<Detail />} />
      </Route>
    </Routes>
  );
}
