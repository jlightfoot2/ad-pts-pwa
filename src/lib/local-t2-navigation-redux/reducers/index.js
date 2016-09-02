import {LOCATION_CHANGE} from 'react-router-redux';
import {CONFIG_T2_NAVIGATION} from '../actions';

/**
 * Eventually this data will come from api
 * @type {[type]}
 */
var navigationIds = [];
export const navigationTree = addParentProperty({
  '1': {
    id: '1',
    name: 'Home',
    routes: ['/main/home', '/', '/intro'],
    pathname: '/main/home',
    level: 0,
    childrenIds: ['3', '2', '4'],
    parentId: null
  },
  '2': {
    id: '2',
    name: 'Assessment',
    routes: ['/main/assessment'],
    level: 1,
    pathname: '/main/assessment',
    childrenIds: ['6']
  },
  '3': {
    id: '3',
    name: 'Videos',
    routes: ['/main/videos'],
    level: 1,
    pathname: '/main/videos',
    childrenIds: ['5']
  },
  '4': {
    id: '4',
    name: 'PTS Library',
    routes: ['/main/library'],
    pathname: '/main/library',
    level: 1,
    childrenIds: []
  },
  '5': {
    id: '5',
    name: 'Video',
    routes: [new RegExp('/main/video/[0-9]+')],
    level: 2,
    pathname: '/main/video',
    childrenIds: []
  },
  '6': {
    id: '6',
    name: 'Assessmen Result',
    routes: ['/main/result'],
    level: 2,
    pathname: '/main/result',
    childrenIds: []
  }
});

function addParentProperty (navTree) {
  Object.keys(navTree).map(function (propName) {
    navigationIds.push(propName);
    navTree[propName].childrenIds.forEach((cid) => {
      navTree[cid]['parentId'] = navTree[propName].id;
    });
  });
  return navTree;
}
var defaultNav = {
  id: '-1',
  name: 'Default',
  routes: [],
  level: 1,
  pathname: '',
  childrenIds: []
};

const navigatinDefaults = {
  tree: {},
  treeIds: [],
  menus: {
    primary: ''
  },
  paths: {
    current: defaultNav,
    last: null,
    parent: null
  }
};

function findRoute (path, cb) {

  for (var id in navigationIds) {
    var navItem = navigationTree[navigationIds[id]];
    var foundRoute = navHasPath(navItem, path);
    if (foundRoute) {
      return foundRoute;
    }
  }
  return false;
}

function navHasPath (navItem, path) {
  var routes = navItem.routes;
  if (routes.indexOf(path) > -1) {
    return navItem;
  } else {
    for (var j = 0; j < routes.length; j++) {
      var route = routes[j];
      if (route instanceof RegExp) {
        if (route.test(path)) {
          return navItem;
        }
      }
    }
  }
}

function paths (state, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      var newRoute = findRoute(action.payload.pathname);
      if (state.current && newRoute && newRoute.id !== state.current.id) {
        var parent = typeof navigationTree[state.current.id] !== 'undefined' ? navigationTree[state.current.id] : null;
        return {
          ...state,
          current: {...newRoute, pathname: action.payload.pathname},
          last: state.current,
          parent: parent
        };
      }

  }
  return state;
}

export const navigation = (state = navigatinDefaults, action) => {

  switch (action.type) {
    case CONFIG_T2_NAVIGATION:
      return {
        ...state,
        tree: action.config.tree || state.tree,
        treeIds: action.config.treeIds || state.treeIds
      };
    case LOCATION_CHANGE:
      if (action.payload.pathname !== state.paths.current) {
        return {...state, paths: paths(state.paths, action)};
      }
  }
  return state;
};

export default navigation;





