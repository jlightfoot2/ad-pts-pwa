import ReactPlayer from 'react-player';
import React,{Component} from 'react';
//<ReactPlayer url={video.src} playing={false} />
/**
 * <video src={video.src} poster={video.img} controls >
			  Sorry, your browser doesn't support embedded videos.
			</video>                   [description]
 */
const videoViewer = ({video,stylesRoot}) => {
	
	return (
		<div style={stylesRoot}>

			<video src={video.src} poster={video.img} controls >
			  Sorry, your browser doesn't support embedded videos.
			</video> 
		</div>
		)
}

export default videoViewer;