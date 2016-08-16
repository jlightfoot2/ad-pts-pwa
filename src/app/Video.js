import ReactPlayer from 'react-player';
import React,{Component} from 'react';

const videoViewer = ({video,stylesRoot,isOnline}) => {
	console.log(isOnline);

	var onlineVideo = <video src={video.src}  poster={video.img} controls >
					     Sorry, your browser doesn't support embedded videos.
					</video>;
					/*
	var offlineVideo =  <video  poster={video.img}>
	                     <source src={video.src} type="video/mp4"/>
					     Sorry, your browser doesn't support embedded videos.
						</video>; */


	var content =  onlineVideo;//typeof isOnline === 'undefined' ||  isOnline ? onlineVideo : offlineVideo;
	return (
		<div style={stylesRoot}>
			{content}
		</div>
		)
}

export default videoViewer;