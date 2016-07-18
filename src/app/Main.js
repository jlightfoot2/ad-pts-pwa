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
import AppSnackBar from './AppSnackBar.js'
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px'
  },
  desktop: {
    backgroundImage: "url("+require('../images/wallpaper/cold-ocean.jpg')+")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#315B85',
    primary2Color: '#315B85',
    accent1Color: '#DEA326',
    accent2Color: '#DEA326',
    accent3Color: '#DEA326',
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
			    iconElementLeft={
			      <IconMenu
			        iconButtonElement={
			          <IconButton><MenuIcon /></IconButton>
			        }
			        targetOrigin={{horizontal: 'left', vertical: 'top'}}
			        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			      >
			        <MenuItem primaryText="Home" containerElement={<Link to="/" />} />
              <MenuItem primaryText="Catalog" containerElement={<Link to="/catalog" />} />
		          <MenuItem primaryText="Tabbed Catalog" containerElement={<Link to="/catalogtabs" />} />
			      </IconMenu>
			    }

              title={this.state.title} />


              <div>{React.cloneElement(this.props.children, { appBarTitle: this.handleTitle, stylesRoot: styles.root })}</div>
              
        </div>
           <AppSnackBar />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default Main;
