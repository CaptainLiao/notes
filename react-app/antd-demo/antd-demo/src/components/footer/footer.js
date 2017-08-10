// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './footer.less'

// const Links = () => (

//   <nav id="footer">
//     <ul>
//         <li><NavLink exact to="/" activeClassName="active">驾考题库</NavLink></li>
//         <li><NavLink to="/about" activeClassName="active">车型识别</NavLink></li>
//         <li><NavLink to="/locations/6" activeClassName="active">购车指北</NavLink></li>
//       </ul>
//   </nav>

// )
// export default Links;


import React, { Component } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';


import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './footer.less';

const PropTypes = require('prop-types');
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;


class BottomNavigationExampleSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }


  select = (index) => {
    this.setState({ selectedIndex: index });
    switch (index) {
      case 0:
        this.context.router.history.push('/');
        break;
      case 1:
        this.context.router.history.push('/about', ['active']);
        break;
      default:
        this.context.router.history.push('/locations/4', ['active']);
        break;
    }
  };

  render() {
    return (
      <div id="footer">
        <MuiThemeProvider>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="驾考题库"
                icon={nearbyIcon}
                onTouchTap={() => this.select(0)}
              />

              <BottomNavigationItem
                label="违章查询"
                icon={nearbyIcon}
                onTouchTap={() => this.select(1)}
              />


              <BottomNavigationItem
                label="车系大全"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2)}
              />

            </BottomNavigation>
          </Paper>
        </MuiThemeProvider>
      </div>


    );
  }
}

BottomNavigationExampleSimple.contextTypes = {
  router: PropTypes.object
}
export default BottomNavigationExampleSimple;
