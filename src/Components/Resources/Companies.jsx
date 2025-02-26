import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import {  FaPlus } from "react-icons/fa";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompaniesData = async () => {
      setLoading(true);

      
      try {
        
        const response = await api.get("administrator/company-list/");
        console.log("Response data:", response.data);

        if (response.data.companies && response.data.companies.length > 0) {
          setCompanies(response.data.companies);
        } else {
          setCompanies([]); // No companies found
        }
      } catch (error) {
        console.error("Error fetching companies data:", error);
        alert("An error occurred while fetching companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesData();
  }, []);

  const handleRemoveCompany = (companyId) => {
    // Optional: Implement removal logic if needed
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== companyId)
    );
  };

  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Companies</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">No companies found.</p>
          <Link
            to="/add-company"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Add a Company
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Companies List Section */}
          <div className="flex-1">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 rounded-lg shadow-md mb-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Company Image and Details */}
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={company.company_image || "/default-company.png"}
                    alt="Company"
                    className="w-20 h-20 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = "/default-company.png";
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {company.company_name || "N/A"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Industry: {company.industry || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Address: {company.address || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Contact: {company.contact || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      About Us: {company.description || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Website:{" "}
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {company.website || "N/A"}
                      </a>
                    </p>
                   
                  </div>
                </div>

              
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                 
                  <Link
                    to={`/company-details/${company.id}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaPlus className="text-sm" /> Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>

        
        </div>
      )}
    </div>
  );
};

export default Companies;