import {combineReducers} from 'redux';
import { normalize, Schema, arrayOf } from 'normalizr';
import {
	QUESTION_ANSWERED
} from '../actions'
const questionSchema = new Schema('questions');

const assessmentConfig = {
	maxScore: 85.0,
	scoring: [
		{id: 1,title: 'Low PTS ',min: 0,max: 33, conclusion: "Your score reflects that you are not experiencing symptoms that are typically associated with post-traumatic stress. \
			Although only a healthcare professional can provide an actual diagnosis of post-traumatic stress, or its absence, your results suggest that \
			your experience is not similar to the experience of individuals suffering from post-traumatic stress."
		},
		{id: 2,title: 'Moderate PTS',min: 34,max: 43, conclusion: "Although only a healthcare professional can provide an actual diagnosis, your score indicates that you are experiencing a moderate number of symptoms that are similar to those associated with post-traumatic stress"
		},
		{id: 3,title: 'High PTS',min: 44,max: 85, conclusion: "Although only a healthcare professional can provide an actual diagnosis, your score indicates that you are experiencing a significantly high number of symptoms that are similar to those associated with post-traumatic stress"
		},
	]
}
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

function ratioComplete(answers){
	const {numAnswered, total} = countCompleted(answers);
	return numAnswered/total;
}
function percentComplete(answers){
	return ratioComplete(answers) * 100;
}

function scaleRatio(answers){
	return tallyScore(answers)/assessmentConfig.maxScore;
}

function countCompleted(answers){
	var count = 0;
	var totalCount = 0;
	Object.keys(answers).map(function(v){
		if(answers[v]){
			count++;
		}
		totalCount++;
	});
	return {numAnswered: count,total: totalCount};
}

function tallyScore(answers){
	if(ratioComplete < 1){
		return 0; //assessment incomplete
	}
	var total = 0;
	Object.keys(answers).map(function(v){
		total += parseInt(answers[v])
	});
	return total;
}

function getScore(answers){
	var tally = tallyScore(answers);

	return assessmentConfig.scoring.filter(function(criteria){
		if(criteria.min <= tally && criteria.max >= tally){
			return true
		}
		return false;
	})[0] || assessmentConfig.scoring[0];
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



	switch(action.type){
		case QUESTION_ANSWERED:
			return scaleRatio(action.answers);
	}
	return state;
}

export const resultDetails = (state = assessmentConfig.scoring[0], action) => {



	switch(action.type){
		case QUESTION_ANSWERED:
			return getScore(action.answers);
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
	result,
	resultDetails
})

export default Assessments;
