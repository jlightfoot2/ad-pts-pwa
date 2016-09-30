export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';

export const fieldChange = (field) => {
  return {
    type: FORM_FIELD_CHANGE,
    field
  };
};

export const formSubmitted = (formId, fields) => {
  return {
    type: FORM_SUBMITTED,
    formId,
    answers: fields
  };
};


export const questionAnswered = (answers) => {
  return {
    type: QUESTION_ANSWERED,
    answers
  };
};
