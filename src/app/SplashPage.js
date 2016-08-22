import { Link, browserHistory } from 'react-router'
import React,{Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';



const Splash = ({stylesRoot,router}) => {
	return (<div style={stylesRoot}><CircularProgress /></div>);
}

export default Splash;