import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.less'

const Links = () => (

  <nav id="footer">
    <ul>
        <li><NavLink exact to="/" activeClassName="active">驾考题库</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">车型识别</NavLink></li>
        <li><NavLink to="/locations/6" activeClassName="active">购车指北</NavLink></li>
      </ul>
  </nav>

)

export default Links;