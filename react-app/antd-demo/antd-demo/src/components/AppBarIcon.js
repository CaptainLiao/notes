import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

// const AppBarIcon = () => (
//   <MuiThemeProvider>
//     <AppBar />
//   </MuiThemeProvider>
// );

class AppBarIcon extends React.Component {
  componentDidMount(e) {
    console.log(window.location)
    console.log(this.props)

  }
  render() {
    return (
      <MuiThemeProvider>
        <AppBar />
      </MuiThemeProvider>
    )
  }
}


export default AppBarIcon;