import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import TableList from './components/pages/TableList';
import TableDetails from './components/pages/TableDetails';
import NotFound from './components/pages/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadTablesRequest } from './store/tablesRedux'




function App() {
 const dispatch = useDispatch();
 
 useEffect(() => 
dispatch(loadTablesRequest()))

 

  return (
   <Container>
     <Header />
     <main>
       <Routes>
         <Route path = "/" element={<TableList />} />
         <Route path = "/table/:id" element={<TableDetails/>} />
         <Route path = "*" element={<NotFound/>} />
       </Routes>
     </main>
     <Footer />
   </Container>
  );
}

export default App;