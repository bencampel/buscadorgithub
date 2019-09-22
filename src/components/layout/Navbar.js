import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({icon, title}) => {
 
  return (
    <nav className="navbar bg-primary">
      <h1><i className={icon}></i> {title}</h1>
      <ul>
        <li>
          <Link to='/'>Inicio</Link>
        </li>
        <li>
          <Link to='/about'>Acerca</Link>
        </li>
      </ul>
    </nav>
  )
  
}

Navbar.defaultProps = {
  title: "Buscador GitHub",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar
