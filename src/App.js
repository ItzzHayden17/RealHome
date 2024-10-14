import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Agents from './pages/Agents';
import Buy from './pages/Buy';
import Favourites from './pages/Favourites';
import Listing from './pages/Listing';
import Login from './pages/Login';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import Footer from './components/Footer';
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listing/:id" element={<Listing />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;
