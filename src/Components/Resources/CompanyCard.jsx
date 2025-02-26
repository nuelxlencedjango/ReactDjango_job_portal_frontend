// src/components/CompanyList.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };
    getCompanies();
  }, []);

  return (
    <div className="company-list">
      {companies.length > 0 ? (
        companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;