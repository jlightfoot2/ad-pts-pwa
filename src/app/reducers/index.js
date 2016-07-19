import {combineReducers} from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {
	MOVE_T2APP_TO_MYAPPS_LIST, 
	MOVE_MYAPP_TO_T2APPS_LIST, 
	ADD_T2APP_TO_MYAPPS_LIST,
	REMOVE_T2APP_FROM_MYAPPS_LIST,
	TOGGLE_T2APP_FROM_MYAPPS_LIST,
	USER_SEES_INTRO,
	SHOW_FLASH_MESSAGE,
	HIDE_FLASH_MESSAGE,
	TAB_CHANGE_INDEX
} from '../actions'
import { normalize, Schema, arrayOf } from 'normalizr';

const videoSchema = new Schema('videos');
const categorySchema = new Schema('Categories');


videoSchema.define({
	category: categorySchema
});

const defaultUser = {
	stage: 0, //intro stage
	role: 'anonymous',
	firstname: '',
	lastname: ''	
}

const defaultView = {
	flash: {
		message: '',
		open: false
	},
	tabs: {
		mainTab: 0
	}
};

const apiVideos = [
	{
		id: 1,
	    img: require('../../images/videos/introduction-to-pts.jpg'),
	    title: 'Introduction to PTS',
	    author: 'T2',	
	    url: 'https://google.com',
	    featured: true,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 2,
	    img: require('../../images/videos/reaction-and-triggers.jpg'),
	    title: 'Reactions and Triggers',
	    author: 'T2',
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 3,
	    img: require('../../images/videos/harmful-habits.jpg'),
	    title: 'Harmful Habits',
	    author: 'T2',	
	    url: 'https://google.com',
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	{
		id: 4,
	    img: require('../../images/videos/helpful-habits.jpg'),
	    title: 'Helpful Habits',
	    author: 'T2',	
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	{
		id: 5,
	    img: require('../../images/videos/treatment.jpg'),
	    title: 'Treatment',
	    author: 'T2',	
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 2,
			name: 'Popular'
		}
	}
];
const appTree = {
	videos: apiVideos
}

const videoItems = normalize(appTree.videos,arrayOf(videoSchema));

console.log(videoItems);

/**
 * Convenience functions to prevent mutations
 */
function updateMapItem(state,id,cb){
	var item = state[id+""];

	state[id+""] = {...cb(null,item)};
	return {...state};
}

function arrayHasItem(arr,val){
	return arr.indexOf(val) > -1
}

function arrayPush(arr,val){
	arr.push(val);
	return [...arr];
}

function arrayPushUnique(arr,val){
	if(!arrayHasItem(arr,val)){
		return arrayPush(arr,val)
	}
	return [...arr];
}

function arrayDeleteValue(arr,val){
	if(arrayHasItem(arr,val)){
		arr.splice(arr.indexOf(val),1);
	}
	return [...arr];
}

/**
 * Redux State
 */

function user(state = defaultUser, action){
	switch(action.type){
		case USER_SEES_INTRO:
		    state.stage = 1;
			return  {...state};
	}
	return state;
}


function videoIds(state = videoItems.entities.result , action){
	return state;
}

function videos(state = videoItems.entities.videos , action){
	return state;
}

function view(state = defaultView, action){
	switch(action.type){
		case SHOW_FLASH_MESSAGE:
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


const appHub = combineReducers({
  videos,
  routing: routerReducer,
  user,
  view
});


export default appHub