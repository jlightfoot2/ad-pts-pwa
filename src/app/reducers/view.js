import {
	SHOW_FLASH_MESSAGE,
	HIDE_FLASH_MESSAGE,
	TAB_CHANGE_INDEX,
	ORIENTATION_CHANGE,
	WINDOW_RESIZE
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
	width: typeof window === 'object' ? window.innerWidth : 0,
	size: 'small'
}

const breakPoints = {
	large: 0,
	medium: 1024,
	small: 768
};

export const device = function(state = defaultDevice, action){
	switch(action.type){
		case ORIENTATION_CHANGE:
		case WINDOW_RESIZE:
				return updateMapItem(state, (err, item) => {
					item.width = action.width;

					if(item.width > breakPoints.medium){
						item.size = 'large';
					}else if(item.width > breakPoints.small){
						item.size = 'medium';
					}else if(item.width > 0){
						item.size = 'small';
					}
					item.orientation = action.width > action.height ? 'landscape' : 'portrait';
					return item;
				} );
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