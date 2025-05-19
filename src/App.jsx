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
import EmployerDetailForm from './Components/Employers/EmployerDetailForm';
import ServiceDetails from './Components/CartContent/ServiceDateDetails';
import Footer from './Components/FooterDiv/Footer';
import OrderForm from './Components/OrdersRequest/OderForm';
import ProtectedRoute from './api/ProtectedRoute';
import Cart from './Components/CartContent/Cart';

import Payment from './Components/CartContent/Payment';
import PaymentConfirmation from './Components/CartContent/PaymentConfirmation';
import  ArtisanFingerprintUpload  from './Components/Workers/FingerPrintUpload';
import ArtisanSearchResults from './Components/SearchDiv/SearchResults';
import ArtisanSearchPage from './Components/Admin/ArtisanSearchPage';


import ArtisanDashboard from "./Components/Dashboard/ArtisanDashboard"; 
import ManagerDashboard from './Components/Admin/Dashboard';
import EmployerDashboard from './Components/Dashboard/EmployerDashboard';
import MarketerDashboard from './Components/Dashboard/MarketerDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';


import CompanyList from './Components/Resources/Companies';
import ContactPage  from './Components/Resources/ContactPage';
import AboutUs from './Components/Resources/About';

import RegisterArtisan from './Components/Marketers/RegisterArtisan';

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
          <Route path="/api/artisans-by-service/:service_title" element={<ArtisanList />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/payment" element={<Payment />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />


          <Route path="/profession-details/:userId/:username" element={<ArtisanProfessionDetails />} />
          <Route path="/employer-details/:userId/:username" element={<EmployerDetailForm />} />

          <Route path='/artisan-dashboard' element={< ArtisanDashboard />} /> 
          <Route path='/employer-dashboard' element={< EmployerDashboard />} />
          <Route path="/artisan-finger-print/:artisanId" element={<ArtisanFingerprintUpload />} />

          <Route path="/artisan-search" element={<ArtisanSearchPage />} />

          <Route path="/manager-dashboard" element={<ManagerDashboard />} />

          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />

          <Route path="/marketer-dashboard" element={<MarketerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

         
          <Route path="/register-artisan" element={<RegisterArtisan />} />
          
          <Route path="/company" element={<CompanyList />} /> 
          <Route path="/about_us" element={<AboutUs />} />  
         
        <Route path="/artisan-search-results" element={<ArtisanSearchResults />} />
        <Route path="/contact_us" element={<ContactPage />} />

          <Route path='/service-details' element ={< ServiceDetails />} /> 
          <Route path="/available-jobs" element={<AvailableJobs />} />
          <Route path="*" element={<NotFound />} />
        
          <Route path="/order-service" element={<ProtectedRoute>
          
            
         

         {/* <Route path="/register/:userType" element={<RegistrationPage />} />
        <Route path="/success" element={<h1>Registration Successful!</h1>} /> */}

            <OrderForm />
            </ProtectedRoute>}/>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;


