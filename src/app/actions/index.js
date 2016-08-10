import isOnline from 'is-online'

export const USER_SEES_INTRO = 'USER_SEES_INTRO';
export const USER_LOAD_VIDEO = 'USER_LOAD_VIDEO';
export const CONNECTIVITY_CHANGE = 'CONNECTIVITY_CHANGE';
export const CONNECTIVITY_CHECK_START = 'CONNECTIVITY_CHECK_START';
export const CONNECTIVITY_CHECK_END = 'CONNECTIVITY_CHECK_END';
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';
export const TAB_CHANGE_INDEX = 'TAB_CHANGE_INDEX';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
;

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

export const connectivityChange = (status) => {
	return {
		type: CONNECTIVITY_CHANGE,
		status
	};	
}
export const connectivityCheckStart = () => {
	return {
		type: CONNECTIVITY_CHECK_START
	};	
}

export const connectivityCheckEnd = () => {
	return {
		type: CONNECTIVITY_CHECK_END
	};	
}

export const checkIsOnline = (checkSource) => {
	return function(dispatch,getState){
		dispatch(connectivityCheckStart());
	    isOnline(function(online) {
	    	var onlineId = online ? 1 : 0;
	     	console.log(online);
	    	if(getState().app.connectivity.status !== onlineId){
	    		dispatch(connectivityChange(onlineId))
	    	}

	        dispatch(connectivityCheckEnd());
	    });
	}

}

export const questionAnswered = (answers) => {
	return {
		type: QUESTION_ANSWERED,
		answers
	}
}
