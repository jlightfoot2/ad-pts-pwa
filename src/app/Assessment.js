import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import RadioList from './RadioList.js'
import {questionAnswered} from './actions';
import { dispatch } from 'redux';
import D3LinearaGauge from './D3LinearaGauge.js';
const Assessment = function(props){
	var {questions,handleSubmit,fields,questionAnswered} = props;
	    console.log('fields');

	function getInput(question,field){
		
        	switch(question.answer.type){
    			case 'radio':
    				return <RadioList choices={question.answer.inputs} field={field} />
    			default:
    				return <input type="text" placeholder="placeholder test" {...field} />
    		}
	}
		
   return (
   		<div>
   		    <h3>PTS Assessment</h3>
   		    <D3LinearaGauge/>
	        <form onSubmit={handleSubmit((data) => questionAnswered(data))}>
	        {Object.keys(fields).map((name,i) => {
	          const field = fields[name]
	          return (<div key={name}>
	            <label>{(i+1)+'. '+questions[name].title}</label>
	            <div>
	            	{getInput(questions[name],field)}
	            </div>
	          </div>)
	        })}
	        <input type="submit" value="submit" />
          	</form>
   		</div>
   	);
}








export default reduxForm(
	{
		form: 'ptsAssessment',
	},
	(state) => {
		
		return {
			questions: state.questions,
			fields: state.questionIds.map((id,i) => (state.questions[id+""].id+"")),
			initialValues: state.answers
		}

	},
	(dispatch) => {
		return {
			questionAnswered: (data) => dispatch(questionAnswered(data))
		}
	}
)(Assessment);