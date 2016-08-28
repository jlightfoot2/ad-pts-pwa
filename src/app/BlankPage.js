/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SplashPage from './SplashPage.js';
const styles = {
  root: {
  },
  container: {

  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F8C023',
    primary2Color: '#07405E',
    accent1Color: '#E64818',
    accent2Color: '#E64818',
    accent3Color: '#E64818'
  }
});

class BlankPage extends Component {

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
              {this.props.children || <SplashPage />}
      </MuiThemeProvider>
    );
  }
}

export default BlankPage;
