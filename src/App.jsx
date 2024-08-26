

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './Components/NavBar/Navbar';
import SearchResults from './Components/SearchDiv/SearchResults'; 
import Login  from './pages/Login'; 
import NotFound  from './pages/NotFound';
import AvailableJobs from './Components/JobDiv/AvailableJobs';
import Jobs from './Components/JobDiv/Jobs';
import ArtisanList from './Components/Workers/ArtisanLists';



//import SignUP from './Compos/Registration';
import SignUP from './Compos/Registration';



import ArtisanProfessionDetails from './Components/Workers/ArtisansProfessionDetails';


//import JobSearch from './JobSearch'; 

import Footer from './Components/FooterDiv/Footer'; 

import AOS from 'aos';
import 'aos/dist/aos.css';

import './index.css';


function Logout(){
  localStorage.clear()
    return <Navigate to="/login" />  
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}



const App = () => {

  useEffect(()=>{
    AOS.init({duration:1000}); 
}, []);

  return (
    <div className='w-[95%] m-auto bg-white'>
      <BrowserRouter>
        <Navbar />
       
        
        <Routes>
          
        <Route path="/" element={<Jobs />} />

        <Route path="/artisans/artisans-by-service/:service_title" element={<ArtisanList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/available-jobs" element={<AvailableJobs />} />
          <Route path="/results" element={<SearchResults />} />


          <Route path="/signup" element={<SignUP />} />
         
          <Route path="/profession-details/:userId/:username" element={<ArtisanProfessionDetails />} />
          <Route path="/register" element={<RegisterAndLogout />} />

        

        </Routes>


      

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;







