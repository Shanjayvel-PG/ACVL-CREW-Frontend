import React from 'react';
import { useNavigate } from 'react-router-dom';
import img_logo from '../images/trucklogo.png';

function MobileApp12() {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid header-content-center">
        <button className="btn btn-close" aria-label="Close" onClick={() => navigate(-1)}>
          &times;
        </button>
        <a className="navbar-brand ms-2" href="#">
          <img src={img_logo} alt="Company Logo" className="company-logo" />
        </a>
      </div>
    </nav>
  );
}

export default MobileApp12;


