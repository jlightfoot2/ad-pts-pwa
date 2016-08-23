import React,{Component} from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router'
const AppBarMenuIcon = ({paths,submenu}) => {
	if(paths.current.level > 0){
		if(paths.current.level > paths.last.level){
			return (<Link to={paths.last.pathname}><IconButton><ArrowBack /></IconButton></Link>)
		}
		return (<Link to="/home"><IconButton><ArrowBack /></IconButton></Link>)
	}else{
	    return (
	    	<IconMenu
		        iconButtonElement={
		          <IconButton><MenuIcon /></IconButton>
		        }
		        targetOrigin={{horizontal: 'left', vertical: 'top'}}
		        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
		      >
		      {submenu.map((item) => (
		      	 <MenuItem primaryText={item.name} containerElement={<Link to={item.pathname} />} />
		      ))}

	    	</IconMenu>);
	}

}

const mapStateToProp = (state,ownProps) => {
	return {
		paths: state.navigation.paths,
		submenu: state.navigation.paths.current.childrenIds.map((id) => (state.navigation.tree[id+""]))
	}
}
export default connect(mapStateToProp)
(AppBarMenuIcon);