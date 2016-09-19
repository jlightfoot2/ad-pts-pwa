import ResourcesComponent from '../Resources.js';

export default {
  path: 'resources',
  name: 'resources',
  getComponent (nextState, cb) {
    cb(null, ResourcesComponent);
  }
};
