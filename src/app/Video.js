import ReactPlayer from 'react-player';
import React,{Component} from 'react';
//<ReactPlayer url={video.src} playing={false} />
/**
 * <video src={video.src} poster={video.img} controls >
			  Sorry, your browser doesn't support embedded videos.
			</video>                   [description]
 */
const videoViewer = ({video,stylesRoot,isOnline}) => {
	var video = <video src={video.src} poster={video.img} controls >
					Sorry, your browser doesn't support embedded videos.
				</video>;
	var offline = <div>This video is not available offline</div>;

	var content = isOnline ? video : offline;
	return (
		<div style={stylesRoot}>
			{content}
		</div>
		)
}

export default videoViewer;