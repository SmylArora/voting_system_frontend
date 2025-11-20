import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false); // close menu on logout
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // close menu when a link is clicked
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>Voting App</h2>
      </div>

      <div className={`navbar__menu ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar__links">
          {!user && (
            <>
              <li>
                <NavLink onClick={handleLinkClick} to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLinkClick} to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {user && user.role === 'voter' && (
            <>
              <li>
                <NavLink onClick={handleLinkClick} to="/candidates" className={({ isActive }) => isActive ? 'active' : ''}>
                  Candidates
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLinkClick} to="/vote" className={({ isActive }) => isActive ? 'active' : ''}>
                  Vote
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLinkClick} to="/results" className={({ isActive }) => isActive ? 'active' : ''}>
                  Results
                </NavLink>
              </li>
            </>
          )}

          {user && user.role === 'admin' && (
            <>
              <li>
                <NavLink onClick={handleLinkClick} to="/admin-panel" className={({ isActive }) => isActive ? 'active' : ''}>
                  Admin Panel
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLinkClick} to="/admin-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar__toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
