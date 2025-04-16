
import React from 'react';
import aboutUsImage from '../../assets/about.jpg';
import { FaCheckCircle, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
          About <span className="text-green-500">I-Wan-Wok</span> Limited
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Connecting Talent with Opportunity
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Text Content */}
          <div className="lg:w-2/3 space-y-12">
            {/* Mission Section */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At I-Wan-Wok Limited, we are dedicated to bridging the gap between skilled artisans, professionals, and employers who value professionalism and expertise. Our mission is to create meaningful connections that empower individuals and businesses to thrive.
              </p>
            </div>


            
            {/* Who We Are Section */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Who We Are</h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Situated at <strong className="text-green-500">111 Apapa Road, Lagos</strong>, I-Wan-Wok Limited is a trusted platform that connects employers with the best artisans and skilled workers. We take pride in our rigorous screening process, ensuring that only the most experienced and professional individuals are part of our network.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With years of experience in various fields, our artisans and professionals are equipped to deliver exceptional results, meeting the highest standards of quality and reliability.
              </p>
            </div>


            
            {/* What We Do Section */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">What We Do</h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We specialize in connecting employers with a curated pool of talented individuals, including:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-gray-600">Skilled Artisans</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-gray-600">Professional Workers</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-gray-600">Experienced Technicians</span>
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-gray-600">Certified Experts</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Our platform ensures that every employer finds the right match for their needs, while every worker gets the opportunity to showcase their skills and grow their career.
              </p>
            </div>


            
            {/* Why Choose Us Section */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Why Choose Us?</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At I-Wan-Wok Limited, we stand out because of our commitment to excellence. Here's why you should choose us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-500 mb-2">Rigorous Screening</h3>
                  <p className="text-gray-600 text-sm">We handpick the best professionals with proven experience.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-500 mb-2">Trusted Network</h3>
                  <p className="text-gray-600 text-sm">Our workers are reliable, skilled, and professional.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-500 mb-2">Seamless Connections</h3>
                  <p className="text-gray-600 text-sm">We make it easy for employers to find the right talent.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-500 mb-2">Customer-Centric Approach</h3>
                  <p className="text-gray-600 text-sm">Your satisfaction is our priority.</p>
                </div>
              </div>
            </div>
          </div>


          
          {/* Image and Contact Section */}
          <div className="lg:w-1/3 space-y-8">
        
            <div className="bg-white p-6 rounded-xl shadow-md">
  <div className="space-y-4 mb-6">
  <h3 className="text-2xl font-bold mb-6">How It Works</h3>
    <div className="flex items-center">
      
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
        <span className="text-green-500 font-bold">1</span>
      </div>
      <div className="text-gray-700">Employer submits request</div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
        <span className="text-green-500 font-bold">2</span>
      </div>
      <div className="text-gray-700">We match with qualified professionals</div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
        <span className="text-green-500 font-bold">3</span>
      </div>
      <div className="text-gray-700">You review and select candidates</div>
    </div>
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
        <span className="text-green-500 font-bold">4</span>
      </div>
      <div className="text-gray-700">Work begins with confidence</div>
    </div>
  </div>
 
  <p className="text-gray-600">
    Our simple 4-step process to connect you with the right professionals.
  </p>
</div>


            
            {/* Contact Section */}
            <div className="text-green-500ext-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <FaMapMarkerAlt className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Our Location</h3>
                    <p className="text-green-500">111 Old Apapa Road, Costain, Lagos</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <FaPhone className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-green-500">+234-705-291-8783</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <FaWhatsapp className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-green-500">+234-812-025-4201</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <FaEnvelope className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-green-500">iwanwoklimited@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
