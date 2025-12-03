

import { Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const TableForm = ({ formData, loading, error, handleChange, handleSubmit }) => {
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">Błąd: {error}</Alert>}

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
            readOnly
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

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </>
  );
};

TableForm.propTypes = {
  formData: PropTypes.shape({
    status: PropTypes.string.isRequired,
    peopleAmount: PropTypes.number.isRequired,
    maxPeopleAmount: PropTypes.number.isRequired,
    bill: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default TableForm;