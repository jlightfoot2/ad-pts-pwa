import {combineReducers} from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {
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

/* 
* The data below could come from a rest server
*/
const defaultUser = {
	stage: 0, //intro stage
	role: 'anonymous',
	firstname: '',
	lastname: ''	
}

/* 
* The data below could come from a rest server
*/
const apiVideos = [
	{
		id: 1,
	    img: require('../../images/videos/introduction-to-pts.jpg'),
	    src: "http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633032942001_PTS-Introduction-to-PTS.mp4",
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
	    src: "http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034474001_PTS-Reactions-and-Triggers.mp4",
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
	    src: "http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034505001_PTS-Harmful-Habits.mp4",
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
	    src: "http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034469001_PTS-Helpful-Habits.mp4",
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
	    src: "http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034502001_PTS-Treatment.mp4",
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


/*
* normalize function will flatten hierarchical/nested data which is 
* the recommended way to handle data with redux
* see https://github.com/paularmstrong/normalizr
* see http://stackoverflow.com/questions/32135779/updating-nested-data-in-redux-store    (scroll to dan abramov's answer)
*/
const videoItems = normalize(appTree.videos,arrayOf(videoSchema));

/**
 * Below are convenience functions to prevent mutations
 */

/**
 * Update object/Map member and
 *
 * @return object A new object representing the new state
 */

function updateMapItem(state,id,cb){
	var item = state[id+""];

	state[id+""] = {...cb(null,item)};
	return {...state};
}

function arrayHasItem(arr,val){
	return arr.indexOf(val) > -1
}

/**
 * Adds an item to an array and returns a new array
 * @param  Array arr the current array
 * @param  Any val The new value to append to the array
 * @return Array     The new array representing the new state
 */
function arrayPush(arr,val){
	arr.push(val);
	return [...arr];
}

/**
 * Same as arrayPush but ensures no duplicates are added
 */
function arrayPushUnique(arr,val){
	if(!arrayHasItem(arr,val)){
		return arrayPush(arr,val)
	}
	return [...arr];
}

/**
 * Returns a new array respresenting the old array less the provided value
 * @param  Array arr  The target array
 * @param  Any val The value we want to target for removal
 * @return Array     The new array representing the new state
 */
function arrayDeleteValue(arr,val){
	if(arrayHasItem(arr,val)){
		arr.splice(arr.indexOf(val),1);
	}
	return [...arr];
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


function videoIds(state = videoItems.result , action){
	return state;
}

function videos(state = videoItems.entities.videos , action){
	return state;
}

function view(state = defaultView, action){
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


const appHub = combineReducers({
  videos,
  videoIds,
  routing: routerReducer,
  user,
  view
});


export default appHub