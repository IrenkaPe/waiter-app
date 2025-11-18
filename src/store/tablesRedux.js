// selectors

// action creators
const createActionName = actionName => `app/tables/${actionName}`;

const LOAD_TABLES = createActionName('LOAD_TABLES');

export const loadTable = (payload) => ({
    type: LOAD_TABLES,
    payload,
})
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
// action creators

// reducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
        return action.payload;
    default:
      return statePart;
  }
};

export default tablesReducer;