import { Card, ButtonGroup, Button, Row } from 'react-bootstrap';
import { useState } from "react";
import ListView from "./listView";
import GridView from "./gridView";

import { useSelector } from "react-redux";

function MyResults() {
  const [listView, setListView] = useState(true);
  const filteredUsers = useSelector((state) => state.filteredUsers);

  function changeListView(e) {
    setListView(e.target.value === "true");
  }

  function ViewBySelection({item}) {
    if (listView) {
      return <ListView key={item.id} user={item}/>
    }
    return <GridView key={item.id} user={item}/>
  }

  return (
    <Card className="mt-2 mt-md-0">
      <Card.Body>
        <div className = "d-flex justify-content-between align-items-center mb-2">
        <Card.Title>Result</Card.Title>
          <ButtonGroup aria-label="Switch view">
            <Button id="list-view" active={listView === true} value="true" onClick={(e) => changeListView(e)}>List</Button>
            <Button id="grid-view" active={listView === false} value ="false" onClick={(e) => changeListView(e)}>Grid</Button>
          </ButtonGroup>
          </div>
        <Row>
          {
            filteredUsers.map(function (item) {
              return (
                <ViewBySelection key={"p_" + item.id} item={item}/>
              );
            })
          }
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MyResults;