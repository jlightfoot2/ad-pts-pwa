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
import { List, Map } from 'immutable';

const appitem = new Schema('appitems');

appitem.define({

});

const defaultApps = [
	{
		id: 1,
	    img: require('../../images/ad_injury_topics_lg.png'),
	    title: 'Physical Injuries',
	    author: 'T2',	
	    url: 'https://google.com',
	    installed: false	
	},
	{
		id: 2,
	    img: require('../../images/intro-pts.png'),
	    title: 'PTS',
	    author: 'T2',
	    url: 'https://google.com',
	    installed: false
	},
	{
		id: 3,
	    img: require('../../images/ad_tobacco_topics_lg.png'),
	    title: 'Tobacco',
	    author: 'T2',	
	    url: 'https://google.com',
	    installed: false	
	},
	{
		id: 4,
	    img: require('../../images/lg-icon-b2r_3.png'),
	    title: 'Breath to Relax',
	    author: 'T2',	
	    url: 'https://google.com',
	    installed: false	
	}
];

const appTree = {
	apps: defaultApps
}

var t2apps = normalize(appTree.apps,arrayOf(appitem));

const appItems = t2apps.entities.appitems;


const initT2AppIds = t2apps.result;
const initMyAppIds = [];


//just containes an object list of all apps
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

function user(state = defaultUser, action){
	switch(action.type){
		case USER_SEES_INTRO:
		    state.stage = 1;
			return  {...state};
	}
	return state;
}

function apps(state = appItems , action){

	switch(action.type){
		case REMOVE_T2APP_FROM_MYAPPS_LIST:
			return updateMapItem(state,action.id,function(err,item){
				item.installed = false;
				return item
			});
		case TOGGLE_T2APP_FROM_MYAPPS_LIST:
			return updateMapItem(state,action.id,function(err,item){
				item.installed = !item.installed;
				return item
			});
	}

	return state;
}

function t2AppIds(state = initT2AppIds, action){
	switch(action.type){

	}
	return state;
}

function myAppIds(state = initMyAppIds, action){

	switch(action.type){
		case ADD_T2APP_TO_MYAPPS_LIST:
			return arrayPushUnique(state,action.id);
		case TOGGLE_T2APP_FROM_MYAPPS_LIST:
			return arrayHasItem(state,action.id) ? arrayDeleteValue(state,action.id) : arrayPushUnique(state,action.id);
		case REMOVE_T2APP_FROM_MYAPPS_LIST:
			return arrayDeleteValue(state,action.id);	
	}
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
  apps,
  t2AppIds,
  myAppIds,
  routing: routerReducer,
  user,
  view
});


export default appHub