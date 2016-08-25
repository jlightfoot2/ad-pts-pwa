
import React,{Component} from 'react';
class videoViewer extends Component {
  componentWillMount(){
  	var {video} = this.props;
      this.props.appBarTitle && this.props.appBarTitle(video.title);
  }
	render(){

		var {video,stylesRoot,isOnline} = this.props;
		var onlineVideo = <video src={video.src}  poster={video.img} controls >
						     Sorry, your browser doesn't support embedded videos.
						</video>;



		var content =  onlineVideo;//typeof isOnline === 'undefined' ||  isOnline ? onlineVideo : offlineVideo;
		return (
			<div style={stylesRoot}>
				{content}
			</div>
			)
	}
}


export default videoViewer;