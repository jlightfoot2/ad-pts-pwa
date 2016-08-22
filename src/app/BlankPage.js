/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { Link } from 'react-router'
import { Router, Route, hashHistory } from 'react-router'
import OnlineStatusBarIcon from './OnlineStatusContainer.js'
import AppSnackBar from './AppSnackBar.js'
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#E64818'
  },
  desktop: {
  }
};
//<IndexRoute component={Home}/>
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F8C023',
    primary2Color: '#07405E',
    accent1Color: '#E64818',
    accent2Color: '#E64818',
    accent3Color: '#E64818',
  },
});

class BlankPage extends Component {
  constructor(props, context) {
    super(props, context);

  }


  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

              <div style={styles.root}>{this.props.children}</div>
              

      </MuiThemeProvider>
    );
  }
}

export default BlankPage;