import React from 'react';
import ReactDOM from 'react-dom';
import BlankPage from './BlankPage.js';

import {Router, hashHistory, browserHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appHub from './reducers';

import { userSeesIntro, windowResize, userSeesSplash } from './actions';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import localForage from 'localForage';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagaRoot from './sagas';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    appHub,
    applyMiddleware(
            routerMiddleware(browserHistory),
            thunkMiddleware,
            sagaMiddleware
          ),
    autoRehydrate()
  );
sagaMiddleware.run(sagaRoot);
const history = syncHistoryWithStore(hashHistory, store);

window.addEventListener('resize', () => {
  store.dispatch(windowResize(window.innerWidth, window.innerHeight));
});

persistStore(store);
var observerGenerator = function () {
  return function (store, selector, onChange) {
    if (!store) throw Error('\'store\' should be truthy');
    if (!selector) throw Error('\'selector\' should be truthy');
    var currentValue = null;
    store.subscribe(() => {
      console.log(store.getState());
      let previousValue = currentValue;
      try {
        currentValue = selector(store.getState());
      } catch (ex) {
        // the selector could not get the value. Maybe because of a null reference. Let's assume undefined
        currentValue = undefined;
      }
      if (previousValue !== currentValue) {
        onChange(store, previousValue, currentValue);
      }
    });
  };
};
var storeObserver = observerGenerator();
storeObserver(
  store,
  (state) => {
    return state.user.stage === 0 && state.routing.locationBeforeTransitions.pathname === '/splash';
  },
  (store, previousValue, currentValue) => {
    store.dispatch(userSeesSplash());
  }
);

storeObserver(
      store,
      (state) => {
        return state.user.stage === 1 && state.routing.locationBeforeTransitions.pathname === '/intro';
      },
      (store, previousValue, currentValue) => {
        store.dispatch(userSeesIntro());
      }
);

const rootRoute = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    childRoutes: [
      require('./routes/quickLoadRoute.js').default,
      require('./routes/mainPageRoute.js').default
    ]
  }
];

const Routes = () => (
    <Provider store={store}>
      <Router history={history} routes={rootRoute} />
    </Provider>
);

export default Routes;
