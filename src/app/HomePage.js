import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps ,showFlashMessage} from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon.js';
import { push } from 'react-router-redux';

const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {
    backgroundColor: 'blue'
  },
  container: {

  }
};

const categories = [
  {id: 1, title: 'Videos', path: '/main/videos', featured: true, img: require('../images/ic_play_arrow_black_24px.svg')},
  {id: 2, title: 'Assessments', path: '/main/assessment', featured: false, img: require('../images/ic_assignment_turned_in_black_24px.svg')},
  {id: 3, title: 'Library', path: '/main/library', featured: false, img: require('../images/ic_library_books_black_24px.svg')},
  {id: 4, title: 'Resources', path: '/main/resources', featured: false, img: require('../images/ic_info_outline_black_24px.svg')}
];

class HomePage extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Home');
  }

  render () {
    var {videoList, flashMessage, appBarTitle, onTileClick, device} = this.props;

    var cols = 4;
    if (device.size === 'small') {
      cols = 2;
    }

    return (
    <div style={styles.container}>
      <GridList
        style={styles.gridList}
        cols={cols}
      >

        {categories.map((tile) => (
          <Link cols={1} key={tile.id} to={tile.path}>
            <GridTile
              key={tile.id}
               {...tile}
              title={tile.title}
              titlePosition='bottom'
            >
              <img src={tile.img} />
            </GridTile>
          </Link>
        ))}
      </GridList>
    </div>);
  }

};

const mapStateToProps = (state) => {
  return {
    videoList: [],
    device: state.device
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessage: (text) => dispatch(showFlashMessage(text)),
    onTileClick: (path) => {
              dispatch(push(path));
            }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);