import store from "./store";
import { ACTIONS } from "../Contants/actions";

export function setUsers(users) {
    store.dispatch({
        type: ACTIONS.SET_USERS,
        payload: users
    });
}

export function addUser(user) {
    store.dispatch({
        type: ACTIONS.ADD_USER,
        payload: user
    });
}

export function setFilteredUsers(filteredUsers) {
    store.dispatch({
        type: ACTIONS.SET_FILTERED_USERS,
        payload: filteredUsers
    });
}