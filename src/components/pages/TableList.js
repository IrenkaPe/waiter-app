import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Card, Container, Button } from "react-bootstrap"
const TableList = () => {

  const tables = useSelector(state => state.tables);

  return (
    <Container>
        <h2>All Table</h2>
          <div className="row">
            {tables.map(table => (
                <div key={table.id} className="col-12 mb-4">
                    <Card>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>Table {table.id}</Card.Title>
                                <Card.Text><strong>Status:</strong> {table.status}</Card.Text>
                            </div>
                            <Link to={`/table/${table.id}`}>
                                <Button variant="primary">Show more</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            ))} 
           </div>
    </Container>
  );
};

export default TableList;