/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

import OnlineStatusBarIcon from './OnlineStatusContainer.js';
import AppSnackBar from './AppSnackBar.js';
import AppBarMenuIcon from './AppBarMenuIcon.js';
import { connect } from 'react-redux';
import {userSeesSplash, userSeesIntro} from './actions';
import {push, replace} from 'react-router-redux';
import { withRouter } from 'react-router';
import {startMonitoringStages} from './actions';

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

class Main extends Component {
  constructor (props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.state = {
      open: false,
      title: ''
    };
  }
  componentWillMount () {
    // redirect to login and add next param so we can redirect again after login
  }
  componentWillReceiveProps () {

  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  handleTouchTap () {
    this.setState({
      open: true
    });
  }

  handleTitle (title) {
    this.setState({
      title: title
    });
  }

  render () {
    return (
        <Paper zDepth={2} style={styles.container} >
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
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default Main;
