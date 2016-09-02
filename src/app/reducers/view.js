import {
	SHOW_FLASH_MESSAGE,
	HIDE_FLASH_MESSAGE,
	TAB_CHANGE_INDEX,
	ORIENTATION_CHANGE,
	WINDOW_RESIZE
} from '../actions'
import {updateMapItem} from  './utils.js'
import {deviceReducer} from 'local-t2-device-redux';
/*
* This is default view data which germane to the app ui only 
* and should be kept separate from rest of the state.
*/
const defaultView = {
	flash: {
		message: '',
		open: false
	},
	tabs: {
		mainTab: 0
	}
};

export const view = function(state = defaultView, action){
	switch(action.type){
		case SHOW_FLASH_MESSAGE: //Display an action message
			state.flash.message = action.text;
			state.flash.open = true;
			return {...state}; 
		case HIDE_FLASH_MESSAGE:
			state.flash.message = '';
			state.flash.open = false;
			return {...state}; 
		case TAB_CHANGE_INDEX:
			//console.log();
			if(typeof state.tabs[action.id] !== 'undefined'){
				state.tabs[action.id] = action.index;
				return {...state};
			}
			return state;
			 
	}
	return state;
}