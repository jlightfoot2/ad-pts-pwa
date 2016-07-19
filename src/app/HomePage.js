import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps ,showFlashMessage} from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon.js';

const styles = {
  gridList: {
    width: 500,
    height: 650,
    overflowY: 'auto',
    marginBottom: 24,
  }
};

class HomePage extends Component {
  componentDidMount(){
      this.props.appBarTitle && this.props.appBarTitle("Home");
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
          
          <GridTile
            key={tile.id}
             {...tile}
            cols={tile.featured ? 2 : 1}
          >
            <img src={tile.img} />

          </GridTile>
        
         
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
)(HomePage);