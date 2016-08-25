import Intro from '../Intro.js';
import {requireIntro} from './utils.js';

export default {
	path: 'intro',
	onEnter(nextState,replace){
		requireIntro(nextState,replace);
	},
	getComponent(nextState,cb){
		cb(null,Intro)
	}
};