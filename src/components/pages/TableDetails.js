import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";

const TableDetails = () => {
  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  const table = tables.find(t => t.id === id);


  if (!table) {
    return (
      <Container>
        <h2>404 - Table Not Found</h2>
        <p>The table with ID "{id}" does not exist.</p>
        <Button variant="secondary" href="/">Back to Table List</Button>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Table {table.id}</h2>
      <Card>
        <Card.Body>
          <Card.Title>Details</Card.Title>
          <Card.Text><strong>Status:</strong> {table.status}</Card.Text>
          <Card.Text><strong>People Amount:</strong> {table.peopleAmount}</Card.Text>
          <Card.Text><strong>Max People Amount:</strong> {table.maxPeopleAmount}</Card.Text>
          {table.status === 'Busy' && (
            <Card.Text><strong>Bill:</strong> {table.bill}</Card.Text>
          )}
          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TableDetails;

