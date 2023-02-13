import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import HotelDetails from './components/HotelDetails';
import MainPage from './components/MainPage';
function App() {
  return (
    <div className="App">
     <Router>
     <MainPage/>
        <Routes>

          <Route path="/hoteldetails/:_id/:bookingfrom/:bookingto" element={<HotelDetails />} />
        </Routes>

      </Router>
      </div>

  );
}

export default App;
