
export const ADD_T2APP_TO_MYAPPS_LIST = 'ADD_T2APP_TO_MYAPPS_LIST';
export const REMOVE_APP_FROM_T2APPS_LIST = 'REMOVE_APP_FROM_T2APPS_LIST';

export const REMOVE_T2APP_FROM_MYAPPS_LIST = 'REMOVE_T2APP_FROM_MYAPPS_LIST';

export const MOVE_T2APP_TO_MYAPPS_LIST = 'MOVE_T2APP_TO_MYAPPS_LIST';
export const MOVE_MYAPP_TO_T2APPS_LIST = 'MOVE_MYAPP_TO_T2APPS_LIST';

export const TOGGLE_T2APP_FROM_MYAPPS_LIST = 'TOGGLE_T2APP_FROM_MYAPPS_LIST';

export const USER_SEES_INTRO = 'USER_SEES_INTRO';
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';
export const TAB_CHANGE_INDEX = 'TAB_CHANGE_INDEX';

export const tabChangeIndex = (id,index) => {
	return {
		type: TAB_CHANGE_INDEX,
		id,
		index 
	}
};

export const userSeesIntro = () => {
	return {
		type: USER_SEES_INTRO
	}
};
export const moveT2AppToMyApps = (id) => {
	return {
		type: MOVE_T2APP_TO_MYAPPS_LIST ,
		id
	};
}

export const  moveMyAppToT2Apps = (id) =>{
	return {
		type: MOVE_MYAPP_TO_T2APPS_LIST,
		id
	};
}

export const addT2AppsToMyApps = (id) => {
	return {
		type: ADD_T2APP_TO_MYAPPS_LIST,
		id
	};	
}

export const removeT2AppFromMyApps = (id) => {
	return {
		type: REMOVE_T2APP_FROM_MYAPPS_LIST,
		id
	};	
}

export const toggleT2AppFromMyList = (id) => {
	return {
		type: TOGGLE_T2APP_FROM_MYAPPS_LIST,
		id
	};	
}

export const showFlashMessage = (text) => {
	return {
		type: SHOW_FLASH_MESSAGE,
		text
	};	
}
export const hideFlashMessage = (text) => {
	return {
		type: HIDE_FLASH_MESSAGE,
	};	
}
