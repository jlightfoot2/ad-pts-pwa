import VideosPage from '../VideosPage.js';
const dynamicVideosPage = {
  path: 'videos',

/*
  getChildRoutes(nextState, callback) {
  console.log("videos routes")
      callback(null, [
        require('./videoRoute.js').default,
      ]);
  },

  
  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./components/Index'),
      })
    })
  },*/

  getComponent(nextState, callback) {
      console.log("videos comp")
      callback(null, VideosPage)
  }
};


export default dynamicVideosPage;