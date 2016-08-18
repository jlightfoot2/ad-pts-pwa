import React,{Component} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fieldChange } from './actions';

const style = {
	container: {
		height: '40px',
		display: 'block',
		clear: 'both'
	},
	horizontal: {
		float: 'left',
		padding: '5px',
		marginLeft: '5px'
	}
}

class RadioList extends Component {

	constructor(props, context){
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		var {fieldChange} = this.props;
		var {formId,fieldId,value} = this.props.field;
		if(value !== event.target.value){
			fieldChange(formId,fieldId,event.target.value);
		}
	}

	render(){
		var {field,choices} = this.props;
		var {formId,fieldId,value} = this.props.field;
		var _self = this;
		return (
				<div style={style.container} >
				 	{choices.map(function(choice,i){
					 	return (
					 		<div style={style.horizontal} key={i} >
						 		<label >{choice.title}</label>
						 		
						 		<input onClick={_self.handleChange} type="radio" checked={value === choice.value} value={choice.value}  />
						 
					 		</div>
					 		);
				 	})}
			 	</div>
			);
	}

}


const mapDispatchToProps = (dispatch) => {
	return {
		fieldChange: (formId,fieldId,value) => (dispatch(fieldChange(formId,fieldId,value)))
	}
}
export default connect(
		null,
		mapDispatchToProps
	)(RadioList)
