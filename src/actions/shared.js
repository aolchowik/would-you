import { hideLoading, showLoading } from 'react-redux-loading';
import { getInitialData, saveQuestionAnswer } from '../utils/api';
import { getUsers, addAnsweredQuestion } from './users';
import { getQuestions, answerQuestion } from './questions';

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({questions, users}) => {
                dispatch(getUsers(users))
                dispatch(getQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion (authedUserDetails, question, answer) {
    const qid = question.id
    const authedUser = authedUserDetails.id

    return (dispatch) => {
        dispatch(showLoading())
        dispatch(answerQuestion({authedUser, question, answer}))
        dispatch(addAnsweredQuestion({user: authedUserDetails, qid, answer}))
        return saveQuestionAnswer({authedUser, qid, answer})
            .then(() => dispatch(hideLoading()))
    }
}
