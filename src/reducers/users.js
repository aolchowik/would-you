import { GET_USERS, ADD_ANSWERED_QUESTION } from '../actions/users'

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
        default :
            return state
    }
}
