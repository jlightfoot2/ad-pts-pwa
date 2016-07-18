import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import { showFlashMessage,removeT2AppFromMyApps} from './actions';

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
  img: {
    width: '100px',
    height: '100px'
  }
};


class MyApps extends Component{
  componentDidMount(){
      this.props.appBarTitle && this.props.appBarTitle("My Apps");
  }
  render(){
    var {appList,removeT2App,flashMessage,appBarTitle,stylesRoot} = this.props;

    var cols = appList.length < 4 ? appList.length : 4;
    var adjustedWidth =  styles.gridList.width/4 * cols
    var gridStyles = {...styles.gridList}

    gridStyles.width = adjustedWidth
    return (
      <div style={stylesRoot}>
        <GridList
          cellHeight={100}
          cols={cols}
          padding={20}
          style={gridStyles}
        >
          {appList.map((tile) => (
            <GridTile
              key={tile.id}

              onClick={() => {
                alert('Launch '+ tile.title)
                //flashMessage(tile.title+ " has been removed from \"My Apps\"");
                //removeT2App(tile.id);
              }}
            >
              <img src={tile.img}  />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }


};

const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps[v+""])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeT2App: (id) => {
      dispatch(removeT2AppFromMyApps(id))
    },
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);