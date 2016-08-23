import {LOCATION_CHANGE} from 'react-router-redux';
import {updateMapItem} from './utils.js'
const navigationTree ={
		'1': {
			id:   '1',
			name: 'root',
			routes: ['/home','/','/intro'],
			pathname: '/home',
			level: 0,
			childrenIds: ['3','2','4']
		},
		'2': {
			id:   '2',
			name: 'Assessment',
			routes: ['/assessment'],
			level: 1,
			pathname: '/assessment',
			childrenIds: []
		},
		'3': {
			id:   '3',
			name: 'Videos',
			routes: ['/videos'],
			level: 1,
			pathname: '/videos',
			childrenIds: ['5']
		},
		'4': {
			id:   '4',
			name: 'PTS Library',
			routes: ['/library'],
			pathname: '/library',
			level: 1,
			childrenIds: []
		},
		'5': {
			id:   '5',
			name: 'Video',
			routes: [new RegExp('/video/[0-9]+')],
			level: 2,
			pathname: '/video',
			childrenIds: []
		}

}

var navigationIds = ['1','2','3','4','5'];

const navigatinDefaults = {
	tree: navigationTree,
	treeIds: navigationIds,
	menus: {
		primary: ''
	},
	paths: {
		current: navigationTree[1],
		last: navigationTree[1]
	} 
}


function findRoute(path,cb){
	var defaultRoute = navigationTree[1];

	for(var id in navigationIds){
	
		var navItem = navigationTree[navigationIds[id]];
		var routes = navItem.routes;
		if(routes.indexOf(path) > -1){
			return navItem;
		}else{
			for(var j = 0; j < routes.length; j++){
				var route = routes[j];
				if(route instanceof RegExp){
					if(route.test(path)){
						return navItem;
					}
				}
			}
		}
	}
	return defaultRoute;
}

function paths(state,action){
	switch(action.type){
		case LOCATION_CHANGE:
			var newRoute = findRoute(action.payload.pathname);
			if(newRoute && newRoute.id !== state.current.id){
				return {
					...state,
					current: {...newRoute,pathname: action.payload.pathname},
					last: state.current
				}
			}

	}
	return state;
}



export const navigation = (state = navigatinDefaults,action) => {

	switch(action.type){
		case LOCATION_CHANGE:
			
			if(action.payload.pathname !== state.paths.current){
				return {...state, paths: paths(state.paths,action)}
			}
	}
	return state;
}







