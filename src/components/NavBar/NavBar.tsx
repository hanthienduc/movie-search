import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { CustomLink } from "../../utils/customLink";
import './NavBar.scss'
export function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <CustomLink to={"/"}>Search</CustomLink>
        <CustomLink to={"/favorite"}>My Favorites</CustomLink>
      </ul>
    </nav>
  );
}

