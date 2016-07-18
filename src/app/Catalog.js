import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps ,showFlashMessage} from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class Catalog extends Component {
  componentDidMount(){
      this.props.appBarTitle && this.props.appBarTitle("T2 Catalog");
  }
  render(){
  var {appList,toggleToMyApps,flashMessage, appBarTitle,stylesRoot} = this.props;
    return (
    <div style={stylesRoot}>
      <GridList
        cellHeight={200}
        style={styles.gridList}
      >

        {appList.map((tile) => (
          
          <GridTile
            key={tile.id}
             {...tile}
            
            subtitle={<span>by <b>{tile.author}</b></span>}
            
            actionIcon={<AppButtonIcon {...tile}  />}
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
    appList: Map(state.apps).toArray()
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
)(Catalog);