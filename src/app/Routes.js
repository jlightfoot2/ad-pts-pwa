import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import IntroPage from './Intro.js';
import HomePage from './HomePage.js';
import VideosPage from './VideosPage.js';
import Assessment from './Assessment2.js';
import AssessmentResult from './AssessmentResult.js';
import PTSLibrary from './PTSLibrary.js';
import VideoPage from './VideoContainer.js';
import { Router, Route, hashHistory } from 'react-router'
import { createStore ,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import appHub from './reducers'
import { Map } from 'immutable';
import { userSeesIntro,windowResize } from './actions';
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
    store.dispatch(windowResize(window.innerWidth));
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
				return state.user.stage === 0 && state.routing.locationBeforeTransitions.pathname === '/intro'
			},
			(store, previousValue, currentValue) => {
					store.dispatch(userSeesIntro());
			}
		);


/*
let unsubscribe = store.subscribe(() => {
  		console.log(store.getState())
  		var  hasSeen = false
  		if(!hasSeen && store.getState().routing.locationBeforeTransitions.pathname === '/intro'){
  			console.log('intro is seen');
  			store.dispatch(userSeesIntro());
  			hasSeen = true;
  		}
	}
)

        <Route path="/videos" component={onlineWrap(<VideosPage/>)} />
        <Route path="/video/:id" component={onlineWrap(<VideoPage/>)} /> 
 */



function requireIntro(nextState, replace) {
  if (store.getState().user.stage === 0) {
    replace({
      pathname: '/intro',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Routes = () => (
	<Provider store={store}>
	  <Router history={history}>
	    <Route component={Main}>
	      {/* make them children of `App` */}
	      <Route path="/" component={HomePage} onEnter={requireIntro} />
	      <Route path="/intro" component={IntroPage} />
        <Route path="/splash" component={IntroPage} />
	      <Route path="/home" component={HomePage} />
        <Route path="/videos" component={VideosPage} />
        <Route path="/video/:id" component={VideoPage} /> 
        <Route path="/assessment" component={Assessment} />
        <Route path="/result" component={AssessmentResult} />
        <Route path="/library" component={PTSLibrary} />
	    </Route>
	  </Router>
	</Provider>
);

export default Routes