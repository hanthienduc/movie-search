import { Link, NavLink } from "react-router-dom";
import './NavBar.scss'
export function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink className="nav-link" to={"/"}>Home</NavLink>
        </li>
        <li>
          <Link className="nav-link" to={"/favorite"}>Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}
