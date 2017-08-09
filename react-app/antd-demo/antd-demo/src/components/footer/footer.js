import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.less'

const Links = () => (

  <nav id="footer">
    <ul>
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">Goodpart</NavLink></li>
        <li><NavLink to="/locations/6" activeClassName="active">About</NavLink></li>
      </ul>
  </nav>

)

export default Links;