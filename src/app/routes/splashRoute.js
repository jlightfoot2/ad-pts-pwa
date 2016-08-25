import SplashPage from '../SplashPage.js';

export default {
	path: 'splash',
	getComponent(nextState,cb){
		cb(null,SplashPage);
	}
}