import { normalize, Schema, arrayOf } from 'normalizr';

const videoSchema = new Schema('videos');
const categorySchema = new Schema('Categories');


videoSchema.define({
	category: categorySchema
});

/* 
* The data below could come from a rest server
*/
export const apiVideos = [
	{
		id: 1,
	    img: require('../../images/videos/introduction-to-pts-med.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633032942001_PTS-Introduction-to-PTS.mp4',
	    title: 'Introduction to PTS',
	    author: 'T2',	
	    url: 'https://google.com',
	    featured: true,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 2,
	    img: require('../../images/videos/reaction-and-triggers-med.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034474001_PTS-Reactions-and-Triggers.mp4',
	    title: 'Reactions and Triggers',
	    author: 'T2',
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 1,
			name: 'Featured'
		}
	},
	{
		id: 3,
	    img: require('../../images/videos/harmful-habits-med.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034505001_PTS-Harmful-Habits.mp4',
	    title: 'Harmful Habits',
	    author: 'T2',	
	    url: 'https://google.com',
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	
	{
		id: 4,
	    img: require('../../images/videos/helpful-habits-med.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034469001_PTS-Helpful-Habits.mp4',
	    title: 'Helpful Habits',
	    author: 'T2',	
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 2,
			name: 'Popular'
		}
	},
	{
		id: 5,
	    img: require('../../images/videos/treatment-med.jpg'),
	    src: 'http://brightcove.vo.llnwd.net/e1/uds/pd/1041122098001/1041122098001_1633034502001_PTS-Treatment.mp4',
	    title: 'Treatment',
	    author: 'T2',
	    url: 'https://google.com',
	    featured: false,
		category: {
			id: 2,
			name: 'Popular'
		}
	}
	
];


const appTree = {
	videos: apiVideos
}


/*
* normalize function will flatten hierarchical/nested data which is 
* the recommended way to handle data with redux
* see https://github.com/paularmstrong/normalizr
* see http://stackoverflow.com/questions/32135779/updating-nested-data-in-redux-store    (scroll to dan abramov's answer)
*/
export const videoItems = normalize(appTree.videos,arrayOf(videoSchema));

export const videoIds = (state = videoItems.result , action) => {
	return state;
};

export const videos = (state = videoItems.entities.videos, action) => {
	return state;
}

