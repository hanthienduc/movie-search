import { Route, Routes } from "react-router-dom";
import { AnimationLayout } from "./AnimationLayout";
import { Detail } from "../pages/Detail/Detail";
import { Favorite } from "../pages/Favorite/Favorite";
import { Search } from "../pages/Search/Search";
/**
 * 
 * @returns Routes of app
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AnimationLayout />}>
        <Route path="/" element={<Search />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="movie/:movieId" element={<Detail />} />
      </Route>
    </Routes>
  );
}
