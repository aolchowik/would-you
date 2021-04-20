export const GET_USERS = 'GET_USERS'
export const ADD_ANSWERED_QUESTION = 'ADD_ANSWERED_QUESTION'

export function getUsers (users) {
    return {
        type: GET_USERS,
        users,
    }
}

export function addAnsweredQuestion ({user, qid, answer}) {
    return {
        type: ADD_ANSWERED_QUESTION,
        user,
        qid,
        answer,
    }
}
