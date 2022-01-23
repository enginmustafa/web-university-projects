import {setUsers, addUser, setFilteredUsers} from './actions';
import myFetch from '../Utils/fetcher';
import { extractYearFromDate } from '../Utils/formatters';

const basicUsersUrl = 'https://dummyapi.io/data/v1/user';
const apiKey = '617e6ddeb84b2612d5cbd39a';
const fetchData = {
  headers: {
    'app-id': apiKey
  }
};

export function fetchUsers() {
    myFetch(basicUsersUrl, fetchData, (result) => { getFullUsers(result.data); });
}

export function filterUsers(fullUsers, filters) {
  let filteredUsers = filterFullUsers(fullUsers, filters);

  setFilteredUsers(filteredUsers);
}

function getFullUsers(basicUsers) {
  setUsers([]);

  basicUsers.forEach(bu => {
    myFetch(basicUsersUrl + '/' + bu.id, fetchData, (result) => { addUser(result)})
  });
};

function filterFullUsers(fullUsers, filters) {
  let filtered = fullUsers.filter(user => {
      for (const prop in filters) {
          //specific filters
          if (prop === "location") {
              if (filters[prop].hasOwnProperty('city') && filters[prop].city !== user[prop].city)
                  return false;
              if (filters[prop].hasOwnProperty('country') && filters[prop].country !== user[prop].country)
                  return false;
          }
          else if (prop === "birthYear") {
              if (parseInt(user['dateOfBirth']) !== extractYearFromDate(filters.birthYear)) {
                  return false;
              }
          }
          //generic filter
          else if (filters[prop] !== user[prop]) {
              return false;
          }
      }
      return true;
  }
  )
  return filtered;
}