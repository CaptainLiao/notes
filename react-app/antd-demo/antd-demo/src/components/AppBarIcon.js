import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const AppBarIcon = () => (
  <MuiThemeProvider>
    <AppBar />
  </MuiThemeProvider>
);


export default AppBarIcon;