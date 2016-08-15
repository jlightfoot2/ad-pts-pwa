import ReactPlayer from 'react-player';
import React,{Component} from 'react';

const videoViewer = ({video,stylesRoot,isOnline}) => {
	console.log(isOnline);
	var video = <video src={video.src} poster={video.img} controls >
					Sorry, your browser doesn't support embedded videos.
				</video>;
	var offline = <div>This video is not available offline</div>;

	var content =  typeof isOnline === 'undefined' ||  isOnline ? video : offline;
	return (
		<div style={stylesRoot}>
			{content}
		</div>
		)
}

export default videoViewer;