import PTSComponent from '../PTSLibrary.js';
import {requireIntro} from './utils.js';

export default {
	path: 'library',
  name: 'library',
	getComponent(nextState,cb){
		cb(null,PTSComponent)
	}
};