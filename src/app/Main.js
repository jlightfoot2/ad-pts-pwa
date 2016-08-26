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

    this.props.stageCheck(this.props.stage, this.props.currentPath, this.props.router);
  }
  componentWillReceiveProps() {
    this.props.stageCheck(this.props.stage, this.props.currentPath, this.props.router);
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

let stateToProps = (state, ownProps) => {
  console.log(ownProps);

  return {
    stage: state.user.stage,
    currentPath: state.routing.locationBeforeTransitions.pathname
  };
};
var timeoutId = null; //TODO
let dispatchToProps = (dispatch, ownProps) => {
  
  return {
    stageCheck: (stage, path, router) => {
      if (stage > -1){
        if(path === '/splash'){
          dispatch(userSeesSplash());
        }
        if(path === '/intro'){
          dispatch(userSeesIntro());
        }
        if (stage < 2){
            if(path !== '/splash'){
              router.push('/splash');
            }
            if(!timeoutId){
              timeoutId = setTimeout(() => (router.push('/intro')), 2000);
            }
        }else if(timeoutId){
          clearTimeout(timeoutId);
        }
      }else{
        dispatch(startMonitoringStages());
        router.push('/splash');
      }

    }
  };
};
export default connect(stateToProps, dispatchToProps)(withRouter(Main));
