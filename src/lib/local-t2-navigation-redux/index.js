import navigationReducer, {navigationTree} from './reducers';
import {init} from './actions';

var navigationIds = [];
function addParentProperty (navTree) {
  Object.keys(navTree).map(function (propName) {
    navigationIds.push(propName);
    navTree[propName].childrenIds.forEach((cid) => {
      navTree[cid]['parentId'] = navTree[propName].id;
    });
  });
  return navTree;
}

const navigationCreateMiddleware = treeRaw => {
  var config = {
    tree: addParentProperty(treeRaw),
    treeIds: navigationIds
  };
  return store => next => {
    next(init(config));
    return action => {
      return next(action);
    };
  };
};

export {
  navigationReducer,
  navigationTree,
  navigationCreateMiddleware
};
