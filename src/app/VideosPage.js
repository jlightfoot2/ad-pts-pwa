import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link, browserHistory } from 'react-router'

import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps ,showFlashMessage} from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon.js';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
const styles = {
  gridList: {
    width: 500,
    height: 650,
    overflowY: 'auto',
    marginBottom: 24,
  },
  playIcon: {
  	marginRight: 24
  }
};

class VideosPage extends Component {
  componentDidMount(){
      this.props.appBarTitle && this.props.appBarTitle("Videos");
  }
  render(){
  var {videoList,toggleToMyApps,flashMessage, appBarTitle,stylesRoot} = this.props;
    return (
    <div style={stylesRoot}>
      <GridList
        cellHeight={200}
        style={styles.gridList}
        cols={2}
      >

        {videoList.map((tile) => (

          <Link key={tile.id} to={'/video/'+tile.id} cols={tile.featured ? 2 : 1}>
            <GridTile
              key={tile.id}
               {...tile}
              
              actionPosition="right"
              titlePosition="top"
              actionIcon={<IconButton><PlayIcon color={'white'} {...tile}  /></IconButton>}
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
    videoList: Map(state.videos).toArray()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => dispatch(toggleT2AppFromMyList(id)),
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideosPage);