// selectors

// action creators
const createActionName = actionName => `app/tables/${actionName}`;

const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

export const loadTable = (payload) => ({
    type: LOAD_TABLES,
    payload,
});


export const updateTable = (id, updatedTable) => {
    return {
        type: UPDATE_TABLE, 
        payload: { id, ...updatedTable }
    };
};

export const updateTableRequest = (id, formData) => {
  return async (dispatch) => {
    const processedData = {
        ...formData,
        ...(formData.status === 'Free' || formData.status === 'Cleaning' ? { peopleAmount: 0, bill: 0 } : {})
    };


    try {
      const response = await fetch(`http://localhost:3131/api/tables/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update table on server');
      }

      const updatedTable = await response.json();

      dispatch(updateTable(id, updatedTable));
    } catch (error) {
      console.error('Error updating table:', error.message);
    }
  };
};

export const loadTablesRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3131/api/tables');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const tables = await response.json();
      dispatch(loadTable(tables));
    } catch (error) {
      console.error('Błąd pobierania stolików:', error.message);
    }
  };
};

// reducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
        return action.payload;
    case UPDATE_TABLE:
        const { id, ...updates } = action.payload;
        return statePart.map(table =>
            table.id === id ? { ...table, ...updates } : table
        );
    default:
      return statePart;
  }
};

export default tablesReducer;