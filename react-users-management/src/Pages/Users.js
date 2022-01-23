import MyNav from "../Components/nav";
import { Container, Row, Col } from 'react-bootstrap';
import MyFilters from "../Components/filters";
import MyResults from "../Components/results";
import { useEffect } from "react";
import { fetchUsers } from "../Store/actionInvoker";

function Users() {
  useEffect(
    () => {
      fetchUsers()
    },
    []);

  return (
    <div>
      <div>
        <MyNav />
        <Container>
          <Row className="mt-3 mt-md-5">
            <Col className="col-12 col-md-3">
              <MyFilters/>
            </Col>
            <Col>
              <MyResults/>
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
