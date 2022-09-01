import { AppRoutes } from "./core/AppRoutes";
import { NavBar } from "./components/NavBar/NavBar";
import { motion, useScroll } from "framer-motion";
import { useMovieContext } from "./context/MovieContext";

function App() {
  const { scrollYProgress } = useScroll();
  const { searchMovieResult } = useMovieContext()
  return (
    <div className="app">
      {searchMovieResult.length ? <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      /> : ''}
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
