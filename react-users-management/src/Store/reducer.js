import { ACTIONS } from '../Contants/actions';

export default function reducer(state, action) {
    switch (action.type) {
        //set all users at once
        case ACTIONS.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        //accumulate users    
        case ACTIONS.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        //set filtered users
        case ACTIONS.SET_FILTERED_USERS:
            return {
                ...state,
                filteredUsers: action.payload
            }
        default:
            return state;
    }
}