import {GET_USERS, ADD_ANSWERED_QUESTION } from '../actions/users'
import {ADD_QUESTION} from "../actions/questions";

export default function users (state = {}, action) {
    switch(action.type) {
        case GET_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWERED_QUESTION :
            const { user, qid, answer } = action
            const userUpdated = {
                ...user,
                answers: Object.assign(user.answers, {[qid]: answer})
            }
            return {
                ...state,
                [user.id]: userUpdated
            }
        case ADD_QUESTION :
            const { question } = action
            const { author, id } = question


            const userData = state[author]
            const userUpdatedWithCreatedQuestion = {
                ...userData,
                questions: state[author].questions.concat(id)
            }

            return {
                ...state,
                [author]: userUpdatedWithCreatedQuestion
            }
        default :
            return state
    }
}
