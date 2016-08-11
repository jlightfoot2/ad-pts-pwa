import {combineReducers} from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import {
	QUESTION_ANSWERED
} from '../actions'
const questionSchema = new Schema('questions');


function makeRadios(){

	return {
		type: 'radio',
		inputs: [
			{title: "Not at all",value: "1",score: 2},
			{title: "A little bit",value: "2",score: 2},
			{title: "Moderately",value: "3",score: 2},
			{title: "Quite A bit",value: "4",score: 2},
			{title: "Extremely",value: "5",score: 2}
			]
	}
}
const apiQuestions = [
	{id: 1, title: "Repeated, disturbing memories, thoughts, or images of a stressful military experience from the past?",type: 'text', answer: makeRadios()},
	{id: 2,title: "Repeated, disturbing dreams of a stressful military experience from the past?",type: 'text',answer: makeRadios()},

	{id: 3,title: "Suddenly acting or feeling as if a stressful military experience were happening again (as if you were reliving it)?",type: 'text',answer: makeRadios()},
	{id: 4,title: "Feeling very upset when something reminded you of a stressful military experience from the past?",type: 'text',answer: makeRadios()},

	{id: 5,title: "Having physical reactions (e.g., heart pounding, trouble breathing, or sweating) when something reminded you of a stressful military experience from the past?",type: 'text',answer: makeRadios()},
	{id: 6,title: "Avoiding thinking about or talking about a stressful military experience from the past or avoid having feelings related to it?",type: 'text',answer: makeRadios()},
	{id: 7,title: "Avoiding activities or situations because they remind you of a stressful military experience from the past?",type: 'text',answer: makeRadios()},
	{id: 8,title: "Trouble remembering important parts of a stressful military experience from the past?",type: 'text',answer: makeRadios()},

	{id: 9,title: "Loss of interest in things that you used to enjoy?",type: 'text',answer: makeRadios()},
	{id: 10,title: "Feeling distant or cut off from other people?",type: 'text',answer: makeRadios()},
	{id: 11,title: "Feeling emotionally numb or being unable to have loving feelings for those close to you?",type: 'text',answer: makeRadios()},
	{id: 12,title: "Feeling as if your future will somehow be cut short?",type: 'text',answer: makeRadios()},

	{id: 13,title: "Trouble falling or staying asleep?",type: 'text',answer: makeRadios()},
	{id: 14,title: "Feeling irritable or having angry outbursts?",type: 'text',answer: makeRadios()},
	{id: 15,title: "Having difficulty concentrating?",type: 'text',answer: makeRadios()},
	{id: 16,title: "Being \"super alert\" or watchful on guard?",type: 'text',answer: makeRadios()},

	{id: 17,title: "Feeling jumpy or easily startled?",type: 'text',answer: makeRadios()}
];

questionSchema.define({
});

const appTree = {
	questions: apiQuestions
}

const questionItems = normalize(appTree.questions,arrayOf(questionSchema));






export const questions = (state = questionItems.entities.questions,action) => {
	return state;
}

export const questionIds = (state = questionItems.result,action) => {
	return state;
}

export const result = (state = 0.5, action) => {
	function countAnswered(answers){
		var count = 0
		var totalCount = 0
		Object.keys(answers).map(function(v){
			console.log(answers[v])
			if(answers[v]){
				count++;
			}
			totalCount++;
		});
		return {numAnswered: count,total: totalCount};
	}

	switch(action.type){
		case QUESTION_ANSWERED:
			console.log(countAnswered(action.answers),action.answers);
			const {numAnswered, total} = countAnswered(action.answers);
			return numAnswered/total;
	}
	return state;
}


export const answers = (state = {},action) => {
	switch(action.type){
		case QUESTION_ANSWERED:
			return {...action.answers}
	}
	return state;
}


const Assessments = combineReducers({
	answers,
	questions,
	questionIds,
	result
})

export default Assessments;
