import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import RadioList from './RadioList2.js'
import {formSubmitted} from './actions';
import { dispatch } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

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

		var {fields,result,questions,handleSubmit,formSubmitted,stylesRoot,router} = this.props;
	

		function getInput(field){
				
	        	switch(questions[field.id+""].answer.type){
	    			case 'radio':
	    				return <RadioList field={field} choices={questions[field.id+""].answer.inputs} />
	    			default:
	    				return <input type="text" placeholder="placeholder test" />
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
			        <form>
			        {fields.map((field,i) => {
			          return (<div key={field.id}>
			            <label style={{fontWeight: 'bold'}}>{(i+1)+'. '+field.title}</label>
			            <div>
			            	{getInput(field)}
			          
			            </div>
			          </div>)
			        })}
			        <input type="button" onClick={() => {handleSubmit(fields[0].formId,fields,router)}} value="submit" />
			   
		          	</form>
	          	</div>
	   		</div>
	   	);
	}
}







var formId = 'assessmentTest';
export default connect(
	(state,ownProps) => {

		return {
			formId,
			questions: state.assessment.questions,
			result: state.assessment.result,

			//to do abstract out into module
			fields: state.assessment.forms.assessmentTest.fieldIds.map((fid) => (state.assessment.forms.assessmentTest.fields[fid+""]))
			//initialValues: state.assessment.answers
		}

	},
	(dispatch,ownProps) => {

		return {
			handleSubmit: (formId,fields,router) => {
				dispatch(formSubmitted(formId,fields))
				router.push('/result');
			}
		}
	}
)(withRouter(Assessment));