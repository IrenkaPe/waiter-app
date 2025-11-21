import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { updateTable } from "../../store/tablesRedux"; 

const TableDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tables = useSelector(state => state.tables);
  const table = tables.find(t => t.id === id);

  const [formData, setFormData] = useState({
    status: '',
    peopleAmount: 0,
    maxPeopleAmount: 0,
    bill: 0
  });

  useEffect(() => {
    if (table) {
      setFormData({
        status: table.status,
        peopleAmount: table.peopleAmount,
        maxPeopleAmount: table.maxPeopleAmount,
        bill: table.bill,
      });
    }
  }, [table]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    

    setFormData(prev => {
        let updated = {...prev, [name]: value };
        if (name === 'maxPeopleAmount') {
            const newMax = parseInt(value) || 0;
            if (updated.peopleAmount > newMax) {
                updated.peopleAmount = newMax;
            }
        }
        if (name === 'peopleAmount') {
            const newPeople =parseInt(value) || 0;
            if (newPeople > updated.maxPeopleAmount){
                return prev;
            }
        }
        return updated
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTable(table.id, formData));
    navigate('/');
  };

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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Busy">Busy</option>
            <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>People Amount</Form.Label>
          <Form.Control
            type="number"
            name="peopleAmount"
            value={formData.peopleAmount}
            onChange={handleChange}
            min="0"
            max={formData.maxPeopleAmount} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Max People Amount</Form.Label>
          <Form.Control
            type="number"
            name="maxPeopleAmount"
            value={formData.maxPeopleAmount}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </Form.Group>
        {formData.status === 'Busy' && (
          <Form.Group className="mb-3">
            <Form.Label>Bill</Form.Label>
            <Form.Control
              type="number"
              name="bill"
              value={formData.bill}
              onChange={handleChange}
              min="0"
            />
          </Form.Group>
        )}
        <Button variant="success" type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default TableDetails;
