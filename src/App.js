import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddUser from './pages/AddUser'
import EditUser from './pages/editUser';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/add-user' element={<AddUser/>}/>
        <Route exact path='/edit-user/:id' element={<EditUser/>}/>
      </Routes>
    </>
  );
}

export default App;
