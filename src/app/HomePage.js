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
    width: 500,
    height: 425,
    overflowY: 'auto',
    marginBottom: 24,
  },
  gridTile: {
    backgroundColor: 'blue'
  }
};

const categories = [
  {id: 1,title: 'Videos', path: '/main/videos',featured: true, img: require("../images/videos/introduction-to-pts.jpg")},
  {id: 2,title: 'Assessments', path: '/main/assessment',featured: false, img: require("../images/videos/reaction-and-triggers.jpg")},
  {id: 3,title: 'PTS Library', path: '/main/library',featured: false, img: require("../images/videos/harmful-habits.jpg")}
];

class HomePage extends Component {

  constructor(props){
    super(props);

  }
  componentWillMount(){
     this.props.appBarTitle && this.props.appBarTitle("Home");
  }

  render(){
  var {videoList,flashMessage, appBarTitle,stylesRoot,onTileClick} = this.props;
    return (
    <div style={stylesRoot}>
      <GridList
        cellHeight={200}
        style={styles.gridList}
        cols={2}
      >

        {categories.map((tile) => (
          <Link cols={tile.featured ? 2 : 1} key={tile.id} to={tile.path}>
            <GridTile
              key={tile.id}
               {...tile}
              title={tile.title}
              titlePosition="bottom"
              
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
    videoList: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessage: (text) => dispatch(showFlashMessage(text)),
    onTileClick: (path) => {
              dispatch(push(path));
            }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);