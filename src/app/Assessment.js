import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import RadioList from './RadioList.js'
import {questionAnswered} from './actions';
import { dispatch } from 'redux';
import { withRouter } from 'react-router';
const validate = (values,ownProps) => {
  const errors = {};

  ownProps.fields.forEach(function(v){
  	if(!values[v+""]){
  		errors[v+""] = "Required";
  	}
  });

  return errors
}
class Assessment extends Component{
	componentDidMount(){
	    this.props.appBarTitle && this.props.appBarTitle("PTS Assessment");
	}
	render(){

		var {result,questions,handleSubmit,fields,questionAnswered,stylesRoot,router} = this.props;


		function getInput(question,field){
			
	        	switch(question.answer.type){
	    			case 'radio':
	    				return <RadioList choices={question.answer.inputs} field={field} />
	    			default:
	    				return <input type="text" placeholder="placeholder test" {...field} />
	    		}
		}
			
	   return (
	   		<div style={stylesRoot}>
	   		    <div>
	   		    	<p>
						Below is a list of problems and complaints that veterans sometimes have in 
						response to stressful military experiences. Please read each one carefully, 
						then circle one of the numbers to the right to indicate how much you have 
						been bothered by that problem in the past month.
	   		    	</p>
	   		    </div>
	   		    <div>
			        <form onSubmit={handleSubmit((data) => questionAnswered(data,this.props))}>
			        {Object.keys(fields).map((name,i) => {
			          const field = fields[name]
			          return (<div key={name}>
			            <label style={{fontWeight: 'bold'}}>{(i+1)+'. '+questions[name].title}</label>
			            <div>
			            	{getInput(questions[name],field)}
			            	{field.touched && field.error && <div style={{color: 'red'}}>{field.error}</div>}
			            </div>
			          </div>)
			        })}
			        <input type="submit" value="submit" />
			   
		          	</form>
	          	</div>
	   		</div>
	   	);
	}
}








export default reduxForm(
	{
		form: 'ptsAssessment',
		validate
	},
	(state) => {
		
		return {
			questions: state.assessment.questions,
			result: state.assessment.result,
			fields: state.assessment.questionIds.map((id,i) => (state.assessment.questions[id+""].id+"")),
			initialValues: state.assessment.answers
		}

	},
	(dispatch,ownProps) => {
		return {
			questionAnswered: (data,props) => {
				dispatch(questionAnswered(data))
				props.router.push('/result');
			}
		}
	}
)(withRouter(Assessment));