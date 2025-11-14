import { Routes, Route } from 'react-router-dom';
import TableList from './components/pages/TableList';
import TableDetails from './components/pages/TableDetails';
import NotFound from './components/pages/NotFound';



function App() {
  return (
    
    <Routes>
      <Route path = "/" element={<TableList />} />
      <Route path = "/" element={<TableDetails/>} />
      <Route path = "/" element={<NotFound/>} />
    </Routes>
  );
}

export default App;