import React from "react";
import { FaCrown } from "react-icons/fa";
import { useHistory } from "react-router";
export default function Navbar() {
  const history = useHistory();
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-wrapper">
        <div className="dashboard-header-left">
          <span className="dashboard-header-logo">
            <FaCrown />
          </span>
          <span className="dashboard-header-title-wrapper">
            <span className="dashboard-header-title">
              Royal Banking Services
            </span>
            <span className="dashboard-header-tagline">
              Let's Make Money Simple
            </span>
          </span>
        </div>
        <div className="dashboard-header-right">
          <ul>
            <li>
              <a href="#" onClick={() => history.push("/")}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/customers")}>
                Customers
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/search")}>
                search customer
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/transaction")}>
                Transaction
              </a>
            </li>
            <li>
              <a href="#" onClick={() => history.push("/history")}>
                History
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
