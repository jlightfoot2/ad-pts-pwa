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
import AppSnackBar from './AppSnackBar.js';
import AppBarMenuIcon from './AppBarMenuIcon.js';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px'
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

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
   
    
    this.state = {
      open: false,
      title: ''
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleTitle(title){
    this.setState({
      title: title
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper  zDepth={2} style={styles.container} >
        <div style={styles.desktop}>

          <AppBar
              title={this.state.title}
              titleStyle={{textAlign: 'center'}}
    			    iconElementLeft={<AppBarMenuIcon/>}
              iconElementRight={<OnlineStatusBarIcon/>}
               />


              <div>{React.cloneElement(this.props.children, { appBarTitle: this.handleTitle, stylesRoot: styles.root })}</div>
              
        </div>
           <AppSnackBar />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default Main;
