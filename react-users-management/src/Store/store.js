import { createStore } from "redux";
import  reducer  from "./reducer";

const store = createStore(reducer, {users: [], filteredUsers: []});

export default store;