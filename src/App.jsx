// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Login from './Components/Login';
import NotFound from './pages/NotFound';
import AvailableJobs from './Components/JobDiv/AvailableJobs';
import Jobs from './Components/JobDiv/Jobs';
import ArtisanList from './Components/Workers/ArtisanLists';
import SignUP from './Compos/Registration';
import ArtisanProfessionDetails from './Components/Workers/ArtisansProfessionDetails';
import Footer from './Components/FooterDiv/Footer';
import OrderForm from './Components/OrdersRequest/OderForm';
import ProtectedRoute from './api/ProtectedRoute';
import Cart from './Components/CartContent/Cart';
//import Payment from "./Components/CartContent/Pay";
import CheckPayment from './Components/CartContent/CheckPayment'



import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';




const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='w-[95%] m-auto bg-white'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/artisans/artisans-by-service/:service_title" element={<ArtisanList />} />
          <Route path="/cart" element={<Cart />} />

          {/*<Route path='/checkout-page' element={<Checkout />} />
          <Route path='/payment-method' element={<Payment />} /> */}

          <Route path='/pay-money' element={<CheckPayment />}/>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/profession-details/:userId/:username" element={<ArtisanProfessionDetails />} />
          <Route path="/available-jobs" element={<AvailableJobs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/order-service" element={<ProtectedRoute>
            <OrderForm />
            </ProtectedRoute>}/>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;



