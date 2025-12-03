// src/features/tables/TableDetails.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TableForm from "../features/TableForm";
import { selectTableById } from "../../store/tablesRedux";
import { updateTableRequest } from "../../store/tablesRedux";

const TableDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const table = useSelector(state => selectTableById(state, id));

  const [formData, setFormData] = useState({
    status: '',
    peopleAmount: 0,
    maxPeopleAmount: 0,
    bill: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      let updated = { ...prev, [name]: value };

      if (name === 'maxPeopleAmount') {
        const newMax = parseInt(value) || 0;
        if (updated.peopleAmount > newMax) {
          updated.peopleAmount = newMax;
        }
      }

      if (name === 'peopleAmount') {
        const newPeople = parseInt(value) || 0;
        if (newPeople > updated.maxPeopleAmount) {
          return prev;
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(updateTableRequest(table.id, formData));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!table) {
    return (
      <Container>
        <h2>404 - Table Not Found</h2>
        <p>The table with ID "{id}" does not exist.</p>
        <button onClick={() => navigate('/')}>Back to Table List</button>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Table {table.id}</h2>
      <TableForm
        formData={formData}
        loading={loading}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default TableDetails;