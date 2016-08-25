import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import IntroPage from './Intro.js';
import HomePage from './HomePage.js';
import BlankPage from './BlankPage.js';
//import VideosPage from './VideosPage.js';
import SplashPage from './SplashPage.js';
import Assessment from './Assessment2.js';
import AssessmentResult from './AssessmentResult.js';
import PTSLibrary from './PTSLibrary.js';
//import VideoPage from './VideoContainer.js';
import VidoeRoute from './routes/videoRoute.js';
import VidoesRoute from './routes/videosRoute.js';
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import { createStore ,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import appHub from './reducers'
import { Map } from 'immutable';
import { userSeesIntro,windowResize,userSeesSplash } from './actions';
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localForage'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore,routerMiddleware, push } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import sagaRoot from './sagas';
import Connectivity from './Connectivity.js';

function onlineWrap(comp){
  return (props) => {
      return <Connectivity {...props}>{comp}</Connectivity>
    }
}



const sagaMiddleware = createSagaMiddleware()

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
    store.dispatch(windowResize(window.innerWidth,window.innerHeight));
});

persistStore(store);
var observerGenerator = function(){
  return function(store, selector, onChange) {
    if (!store) throw Error('\'store\' should be truthy');
    if (!selector) throw Error('\'selector\' should be truthy');
    var currentValue = null;
    store.subscribe(() => {
        console.log(store.getState());
        let previousValue = currentValue;
        try {
            currentValue = selector(store.getState());
        }
        catch(ex) {
            // the selector could not get the value. Maybe because of a null reference. Let's assume undefined
            currentValue = undefined;
        }
        if (previousValue !== currentValue) {
            onChange(store, previousValue, currentValue);
        }
    });
  }
}
var storeObserver = observerGenerator();
storeObserver (
			store,
			(state) => {
				return state.user.stage === 0 && state.routing.locationBeforeTransitions.pathname === '/splash'
			},
			(store, previousValue, currentValue) => {
					store.dispatch(userSeesSplash());
			}
		);

storeObserver (
      store,
      (state) => {
        return state.user.stage === 1 && state.routing.locationBeforeTransitions.pathname === '/intro'
      },
      (store, previousValue, currentValue) => {

          store.dispatch(userSeesIntro());
      }
    );


function requireIntro(nextState, replace) {

  switch(store.getState().user.stage){
    case 0:

      replace({
        pathname: '/intro',
        state: { nextPathname: nextState.location.pathname }
      });
      break;
    case 1:
      replace({
        pathname: '/splash',
        state: { nextPathname: nextState.location.pathname }
      });
      break;
  }
}


const rootRoute = [
	{
	
	  //onEnter: ({ params }, replace) => replace(`/home`),
	  getComponent(nextState,cb){
	  	cb(null,BlankPage)
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

export default Routes