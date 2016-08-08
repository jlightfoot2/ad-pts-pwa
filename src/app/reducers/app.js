import {updateMapItem, arrayHasItem, arrayPush, arrayPushUnique ,arrayDeleteValue} from './utils.js';
export {CONNECTIVITY_CHANGE,CONNECTIVITY_CHECK} from '../actions';
const defaultApp = {
	connectivity: {
		status: 1, //1 == online, 0 == offline
		lastCheck: 0, //seconds ago
		lastCheckType: 'event' //('click','timer','event')
	}
}


export const app = (state = defaultApp,action) => {
	switch(action.type){
		case CONNECTIVITY_CHECK:
			state.connectivity = updateMapItem(state.connectivity,'lastCheck',() => (0) )
			return {...state};
		case CONNECTIVITY_CHANGE:
			state.connectivity = updateMapItem(state.connectivity,'status',() => (action.status) )
			return {...state};		
	}
	return state;
}