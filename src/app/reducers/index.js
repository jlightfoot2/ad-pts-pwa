import {combineReducers} from 'redux';
import {view} from './view.js';
import {videos, videoIds,} from './videos.js';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {updateMapItem, arrayHasItem, arrayPush, arrayPushUnique ,arrayDeleteValue} from './utils.js';

import {
	USER_SEES_INTRO
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

function user(state = defaultUser, action){
	switch(action.type){
		case USER_SEES_INTRO: //User has seen the intro so they don't need to see it again with stage > -
		    state.stage = 1;
			return  {...state};
	}
	return state;
}


const appHub = combineReducers({
  videos,
  videoIds,
  routing: routerReducer,
  user,
  view
});


export default appHub