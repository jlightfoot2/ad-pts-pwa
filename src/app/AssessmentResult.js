import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import D3LinearaGauge from './D3LinearaGauge.js';
import { connect } from 'react-redux';
import ReactTransitionGroup from 'react-addons-transition-group';
import {TweenLite} from 'gsap';
class AssessentText extends Component {

    componentWillAppear(callback){
      this._animateIn(callback);
    }


    componentWillEnder(callback){
        this._animateIn(callback);
    }

    _animateIn(callback){
    	var el = this.refs.assessmentText;
	    TweenLite.set(el, {opacity: 0});
	    setTimeout(function() {
	      console.log("timed in");
	      TweenLite.to(el, 1, {opacity: 1}).play().eventCallback("onComplete", callback);
	    }, 1000);
    }


	render(){
		var {text} = this.props;
		return (<div ref="assessmentText">
					<p>{text}</p>
				</div>);
	}

}

const AssessmentResult = (props) => {
const {stylesRoot,result,resultDetails} = props;
	return (<div style={stylesRoot}>
				<D3LinearaGauge {...props} />
				<ReactTransitionGroup>
				    <AssessentText text={resultDetails.conclusion} />
				</ReactTransitionGroup>
			</div>);
}

const mapStateToProps = (state) => {
	return {
		result: state.assessment.result,
		resultDetails: state.assessment.resultDetails
	}
}
export default connect(
  mapStateToProps
)(AssessmentResult)

