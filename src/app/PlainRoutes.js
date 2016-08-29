import React from 'react';
import ReactDOM from 'react-dom';
import BlankPage from './BlankPage.js';
import SplashPage from './SplashPage.js';
import {Router, hashHistory, browserHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appHub from './reducers';

import {windowResize} from './actions';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagaRoot from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
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
window.addEventListener('orientationchange', () => {
  setTimeout(() => (store.dispatch(windowResize(window.innerWidth, window.innerHeight))), 500);
});

store.subscribe(() => {
  console.log(store.getState());
});

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

export default class AppProvider extends React.Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    persistStore(store, {}, () => {
      setTimeout(() => {
        this.setState({ rehydrated: true });
      }, 1000);
    });
  }
  componentDidMount () {
    setTimeout(() => {
      windowResize(window.innerWidth, window.innerHeight);
    }, 500);
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
