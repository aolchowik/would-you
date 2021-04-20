import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_QUESTION = 'ADD_QUESTION'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion ({ option1, option2 }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        return saveQuestion({optionOneText: option1, optionTwoText: option2, author: authedUser})
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function answerQuestion ({authedUser, question, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        question,
        answer,
    }
}

export function getQuestions (questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}
