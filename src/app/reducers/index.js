import {combineReducers} from 'redux';
import {view,device} from './view.js';
import {videos, videoIds,} from './videos.js';
import { app } from './app.js';
import assessment from './assessment.js';
import {reducer as formReducer} from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {updateMapItem, arrayHasItem, arrayPush, arrayPushUnique ,arrayDeleteValue} from './utils.js';

import {
	USER_SEES_INTRO,
	USER_SEES_SPLASH
} from '../actions'
/* 
* The data below could come from a rest server
*/
const defaultUser = {
	stage: 0, //intro stage
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
			if(state.stage !== 0){
				return state;
			}
			return  {...state,stage: 1};
		case USER_SEES_INTRO:
			if(state.stage !== 1){
				return state;
			}
			return  {...state,stage: 2};
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
  device
});


export default appHub