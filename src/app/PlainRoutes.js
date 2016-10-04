import React from 'react';
import ReactDOM from 'react-dom';
import BlankPage from './BlankPage.js';
import SplashPage from './SplashPage.js';
import {Router, hashHistory, browserHistory} from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import appHub from './reducers';
import {windowResize} from './actions';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {appSaga, registerPromise} from 'local-t2-app-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';

const manifest = {
  1: (state) => (state),
  9: (state) => ({...state, navigation: null}),
  9002: (state) => ({...state, videos: null})
};

const sagaMiddleware = createSagaMiddleware();
let reducerKey = 'migrations';

const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());

const store = createStore(
    appHub,
    applyMiddleware(
            routerMiddleware(browserHistory),
            thunkMiddleware,
            sagaMiddleware,
            navigationCreateMiddleware(navigationConfig)
          ),
    persistEnhancer
  );
sagaMiddleware.run(appSaga);

const history = syncHistoryWithStore(hashHistory, store);
if (__INCLUDE_SERVICE_WORKER__) {
  if ('serviceWorker' in navigator) {
    const registrationPromise = navigator.serviceWorker.register('./ad-service-worker.js');
    registerPromise(registrationPromise, store).then(function (res) {
      if (__DEVTOOLS__) {
        console.log(res);
      }
    }).catch(function (e) {
      if (__DEVTOOLS__) {
        console.log(e);
      }
      throw e;
    });
  }
}

if (__DEVTOOLS__) {
  store.subscribe(() => {
    console.log(store.getState());
  });
}

const rootRoute = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    name: 'root',
    childRoutes: [
      require('./routes/quickLoadRoute.js').default,
      require('./routes/mainPageRoute.js').default,
      require('./routes/notFoundRoute.js').default
    ]
  }
];

export default class AppProvider extends React.Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {keyPrefix: 'reduxPresistAdModulePts'}, () => {
      setTimeout(() => {
        this.setState({ rehydrated: true });
      }, 300);
    });
  }

  render () {
    if (!this.state.rehydrated) {
      return <BlankPage><SplashPage/></BlankPage>;
    }
    return (
      <Provider store={store}>
        <Router history={history} routes={rootRoute} />
      </Provider>
    );
  }
}
