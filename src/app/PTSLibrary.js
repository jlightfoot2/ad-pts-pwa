import React,{Component} from 'react';
import { connect } from 'react-redux';



class PTSLibrary extends Component {
	componentDidMount(){
		this.props.appBarTitle && this.props.appBarTitle("PTS Library");
	}
	render(){
		return (
			<div>
				<h3>Introduction</h3>
				<p>
	There are four main types of combat or Post-Traumatic Stress reactions:

	Intrusive and unwanted memories of the traumatic event
	Avoidance of reminders of the event
	Negative thoughts and mood
	High physical tension or arousal
	This section of the Post-Traumatic Stress booklet describes these reactions and how to recognize them.
				</p>

				<h3>Intrusive and Unwanted Memories</h3>
				<p>Service members who have been through stressful events often have 
				repeated, disturbing memories of those events.  This is called 
				"re-experiencing." When your mind tries to make sense of what happened, 
				you may experience upsetting thoughts or dreams.  Certain people, 
				places, sounds, or smells can remind you of things that happened while 
				deployed.  These reminders are called "triggers".</p>
			</div>
		);
	}
}

export default PTSLibrary;