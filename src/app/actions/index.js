export const USER_SEES_INTRO = 'USER_SEES_INTRO';
export const USER_LOAD_VIDEO = 'USER_LOAD_VIDEO';
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
