//Library Import
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

//Dependency Import

//Components Import
import Login from './components/Login';
import Booking from './components/Booking';
import AdminPanel from './components/AdminPanel';
import AddRoute from './components/AddRoute';
import MyBookings from './components/MyBookings';
import ManageBookings from './components/ManageBookings';

//Css Import
import './App.css';

function App() {

  const logo = "https://www.freepnglogos.com/uploads/bus-png/image-bus-scribblenauts-wiki-39.png"


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element = {
            <>
              <Login logo ={logo}/>
            </>
          } />
          <Route path='/booking' element = {
            <>
              <Booking/>   
            </>
          } />
          <Route path='/mybookings' element = {
            <>
              <MyBookings/>   
            </>
          } />
          <Route path='/adminPanel' element = {
            <>
              <AdminPanel/>   
            </>
          } />
          <Route path='/addRoute' element = {
            <>
              <AddRoute/> 
            </>
          } />
          <Route path='/deleteRoute' element = {
            <>
              <AdminPanel/>   
            </>
          } />
          <Route path='/allRoutes' element = {
            <>
              <AdminPanel/>   
            </>
          } />
          <Route path='/managebookings' element = {
            <>
              <ManageBookings/>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;