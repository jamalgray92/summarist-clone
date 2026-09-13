import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "sidebar__link sidebar__link--active"
      : "sidebar__link";

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <button
        className="sidebar__menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <aside
        className={
          menuOpen
            ? "sidebar sidebar--open"
            : "sidebar"
        }
      >
        <div>
          <h2 className="sidebar__logo">Summarist</h2>

          <nav className="sidebar__nav">
            <NavLink
              to="/for-you"
              className={getLinkClass}
              onClick={closeMenu}
            >
              For You
            </NavLink>

            <NavLink
              to="/library"
              className={getLinkClass}
              onClick={closeMenu}
            >
              My Library
            </NavLink>

            <NavLink
              to="/highlights"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Highlights
            </NavLink>

            <NavLink
              to="/search"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Search
            </NavLink>
            <NavLink
              to="/settings"
              className={getLinkClass}
              onClick={closeMenu}
            >
             Settings
            </NavLink>
            </nav>
        </div>

        <button
          className="sidebar__logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;