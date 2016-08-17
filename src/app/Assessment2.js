import React,{Component} from 'react';
import { reduxForm } from 'redux-form'
import RadioList from './RadioList2.js'
import {questionAnswered} from './actions';
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

		var {result,questions,handleSubmit,questionAnswered,stylesRoot,router} = this.props;
		console.log(questions);

		function getInput(question){
			
	        	switch(question.answer.type){
	    			case 'radio':
	    				return <RadioList choices={question.answer.inputs} />
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
			        {questions.map((question,i) => {
			        	console.log('field called');
			    	
			          return (<div key={question.id}>
			            <label style={{fontWeight: 'bold'}}>{(i+1)+'. '+question.title}</label>
			            <div>
			            	{getInput(question)}
			          
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








export default connect(
	(state,ownProps) => {

		return {
			questions: state.assessment.questionIds.map((qid) => (state.assessment.questions[qid+""]) ),
			result: state.assessment.result,
			//initialValues: state.assessment.answers
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