import MyNav from "../Components/nav";
import { Container, Row, Col } from 'react-bootstrap';
import MyFilters from "../Components/filters";
import MyResults from "../Components/results";
import myFetch from '../Utils/fetcher';
import {extractYearFromDate} from '../Utils/formatters'
import { useState, useEffect, useRef } from "react";


const basicUsersUrl = 'https://dummyapi.io/data/v1/user';
const apiKey = '617e6ddeb84b2612d5cbd39a';
const fetchData = {
  headers: {
    'app-id': apiKey
  }
};
function Users() {
  const fullUsers = useRef([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(
    () => {
      loadUsers()
    },
    []);

  function loadUsers() {
    myFetch(basicUsersUrl, fetchData, (result) => { getFullUsers(result.data) });
  }

  function getFullUsers(basicUsers) {
    let arr = fullUsers.current;

    basicUsers.forEach(bu => {
      myFetch(basicUsersUrl + '/' + bu.id, fetchData, (result) => { arr.push(result); setUsers([...arr]) })
    });
  };

  function setUsers(users) {
    fullUsers.current = users;
    setFilteredUsers(users);
  }

  function filterUsers(filters) {
    console.log(filters);

    let filtered = fullUsers.current.filter(user => {
      for (const prop in filters) {
        //specific filters
        if(filters[prop] === "location") {
          if(filters[prop].hasOwnProperty('city') && filters[prop].city !== user[prop].city)
            return false;
          if(filters[prop].hasOwnProperty('country') && filters[prop].country !== user[prop].country)
            return false;
        }
        else if(prop === "birthYear") {
          console.log('in')
          if(parseInt(user['dateOfBirth']) !== extractYearFromDate(filters.birthYear)) {

            return false;
          }
        }

        //generic filter
        else if (filters[prop] !== user[prop])
          {
            return false;
          }
        return true;
      }

      return true;
    }
    
    )

    setFilteredUsers(
      filtered
    );

  }

  return (
    <div>
      <div>
        <MyNav />
        <Container>
          <Row className="mt-3 mt-md-5">
            <Col className="col-12 col-md-3">
              <MyFilters filterUsers={filterUsers} />
            </Col>
            <Col>
              <MyResults users={filteredUsers} loadUsers={loadUsers} />
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="text-muted">© 2021 Company, Inc</span>
        </div>
      </footer>
    </div>
  );
}

export default Users;
