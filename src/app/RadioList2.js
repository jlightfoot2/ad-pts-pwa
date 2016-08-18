import React,{Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fieldChange } from './actions';

const style = {
	container: {
		height: '80px',
		display: 'block',
		clear: 'both'
	},
	horizontal: {
		float: 'left',
		padding: '5px',
		marginLeft: '5px'
	},
	vertical: {
		padding: '5px',
		marginLeft: '5px',
		height: '10px'
	}
}

class RadioList extends Component {

	constructor(props, context){
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event,index,newValue){
		var {fieldChange} = this.props;
		var {formId,id,value} = this.props.field;
		
		if(value !== newValue){
			fieldChange(formId,id,newValue);
		}
	}

	render(){
		var {field,choices,deviceSize} = this.props;
		var {formId,id,value} = this.props.field;

		var _self = this;
		const radioStyles = deviceSize === 'small' ? style.vertical : style.horizontal;
		return (
				<div style={style.container} >
        			<SelectField value={value} onChange={this.handleChange}>
        			    <MenuItem key={0} disabled={value!==null} value={null} primaryText="Select One" />
					 	{choices.map(function(choice,i){
						 	return (
							 		<MenuItem key={i+1} value={choice.value} primaryText={choice.title} />
						 		);
					 	})}
				 	</SelectField>
			 	</div>
			);
	}

}

const mapStateToProps = (state,ownProps) => {
	return {
		deviceSize: state.device.size
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fieldChange: (formId,fieldId,value) => (dispatch(fieldChange(formId,fieldId,value)))
	}
}
export default connect(
		mapStateToProps,
		mapDispatchToProps
	)(RadioList)
