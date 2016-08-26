import {combineReducers} from 'redux';
import {view,device} from './view.js';
import {videos, videoIds,} from './videos.js';
import { app } from './app.js';
import assessment from './assessment.js';
import {navigation} from './navigation.js';
import {reducer as formReducer} from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {updateMapItem, arrayHasItem, arrayPush, arrayPushUnique ,arrayDeleteValue} from './utils.js';
import {LOCATION_CHANGE} from 'react-router-redux';
import {
	USER_SEES_INTRO,
	USER_SEES_SPLASH,
	START_MONITORING_STAGES
} from '../actions'
/* 
* The data below could come from a rest server
*/
const defaultUser = {
	stage: -1, //default is page not loaded stage
	role: 'anonymous',
	firstname: '',
	lastname: ''
}

/**
 * Redux State functions
 */

/**
 * Controlls the user state
 * @param object state the user's current state
 * @param object action The action that this function may respond to
 *
 * @return object the new state or the current state
 */
function user(state = defaultUser, action){
	switch(action.type){
		case USER_SEES_SPLASH:
			if(state.stage === 0){
				return  {...state,stage: 1};
			}
			break;
		case USER_SEES_INTRO:
			if(state.stage === 1){
				return  {...state,stage: 2};
			}
			break;
		case START_MONITORING_STAGES:
		  if(state.stage === -1){
		  	return  {...state,stage: 0};
		  }
	}
	return state;
}


const appHub = combineReducers({
  app,
  videos,
  videoIds,
  assessment,
  form: formReducer,
  routing: routerReducer,
  user,
  view,
  device,
  navigation
});


export default appHub