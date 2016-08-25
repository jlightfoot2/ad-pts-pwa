
import Intro from '../Intro.js';
import Main from '../Main.js';
export default {
	getComponent(nextState,cb){
		console.log('quick Load comp called');
		cb(null,Main);
	},

  	getChildRoutes(partialNextState, cb) {
console.log('quick Load routes called 2');
      	cb(null, [
        	require('./introRoute.js').default,
        	require('./defaultRoute.js').default
      	])

  	}
}