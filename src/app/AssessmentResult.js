import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import D3LinearaGauge from './D3LinearaGauge.js';
import { connect } from 'react-redux';

const AssessmentResult = (props) => {
const {stylesRoot,result,resultDetails} = props;
	return (<div style={stylesRoot}>
				<D3LinearaGauge {...props} />
				<div>
					<p>{resultDetails.conclusion}</p>
				</div>
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

