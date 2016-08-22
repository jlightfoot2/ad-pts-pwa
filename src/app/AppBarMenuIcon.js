import React,{Component} from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router'
const AppBarMenuIcon = ({path}) => {
	if(path !== '/home'){
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
			        <MenuItem primaryText="Home" containerElement={<Link to="/home" />} />
	              	<MenuItem primaryText="Videos" containerElement={<Link to="/videos" />} />
	              	<MenuItem primaryText="Assessments" containerElement={<Link to="/assessment" />} />

	    	</IconMenu>);
	}

}

const mapStateToProp = (state,ownProps) => {
	return {
		path: state.routing.locationBeforeTransitions.pathname
	}
}
export default connect(mapStateToProp)
(AppBarMenuIcon);