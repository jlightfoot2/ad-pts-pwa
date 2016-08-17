import {
	SHOW_FLASH_MESSAGE,
	HIDE_FLASH_MESSAGE,
	TAB_CHANGE_INDEX,
	ORIENTATION_CHANGE,
	WINDOW_RESIZE,
} from '../actions'
import {updateMapItem} from  './utils.js'

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

const defaultDevice = {
	orientation: 'landscape',
	width: typeof window === 'object' ? window.innerWidth : 0
}

export const device = function(state = defaultDevice, action){
	switch(action.type){
		case ORIENTATION_CHANGE:
		case WINDOW_RESIZE:
			if(state.width !== action.width){
				return updateMapItem(state,(err,item) => {
					item.width = action.width;
					return item;
				} );
			}
	}
	return state
}
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