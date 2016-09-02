import {LOCATION_CHANGE} from 'react-router-redux';
import {updateMapItem} from './utils.js'
const navigationTree = addParentProperty({
		'1': {
			id:   '1',
			name: 'Home',
			routes: ['/main/home','/','/intro'],
			pathname: '/main/home',
			level: 0,
			childrenIds: ['3','2','4'],
			parentId: null
		},
		'2': {
			id:   '2',
			name: 'Assessment',
			routes: ['/main/assessment'],
			level: 1,
			pathname: '/main/assessment',
			childrenIds: ['6']
		},
		'3': {
			id:   '3',
			name: 'Videos',
			routes: ['/main/videos'],
			level: 1,
			pathname: '/main/videos',
			childrenIds: ['5']
		},
		'4': {
			id:   '4',
			name: 'PTS Library',
			routes: ['/main/library'],
			pathname: '/main/library',
			level: 1,
			childrenIds: []
		},
		'5': {
			id:   '5',
			name: 'Video',
			routes: [new RegExp('/main/video/[0-9]+')],
			level: 2,
			pathname: '/main/video',
			childrenIds: []
		},
		'6': {
			id:   '6',
			name: 'Assessmen Result',
			routes: ['/main/result'],
			level: 2,
			pathname: '/main/result',
			childrenIds: []
		}

});

function addParentProperty (navTree) {
  Object.keys(navTree).map(function (propName) {
    navTree[propName].childrenIds.forEach((cid) => {
      navTree[cid]['parentId'] = navTree[propName].id;
    });
  });
  return navTree;
}

var navigationIds = ['1','2','3','4','5','6'];

const navigatinDefaults = {
	tree: navigationTree,
	treeIds: navigationIds,
	menus: {
		primary: ''
	},
	paths: {
		current: navigationTree[1],
		last: navigationTree[1],
		parent: navigationTree[1]
	} 
}


function findRoute(path,cb){
	var defaultRoute = navigationTree[1];

	for(var id in navigationIds){
		var navItem = navigationTree[navigationIds[id]];
		var foundRoute = navHasPath(navItem,path);
		if(foundRoute){
			return foundRoute;
		}
	}
	return false;
}

function navHasPath(navItem,path){
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







