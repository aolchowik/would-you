import { ADD_QUESTION, GET_QUESTIONS, ANSWER_QUESTION } from "../actions/questions";

export default function questions (state = {}, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [action.question.id]: question
            }
        case ANSWER_QUESTION:
            const { authedUser, answer } = action
            const questionAnswer = action.question[answer]
            const votes = action.question[answer].votes.concat(authedUser)
            const questionUpdated = {
                ...action.question,
                [answer]: {
                    ...questionAnswer,
                    votes
                }
            }

            return {
                ...state,
                [action.question.id]: questionUpdated
            }
        default:
            return state
    }
}
