import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Search() {
  const [searchValue, setSearchValue] = useState("haridas");
  const [searchOption, setSearchOption] = useState("");
  const [customersData, setCustomerData] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/customers")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        // setCustomerData(resp["customers"]);
        setSearchOption(resp["customers"]);
      });
    setTimeout(() => {
      searchfunc();
    }, 1000);
  }, []);
  useEffect(() => {
    console.log("satte1", customersData);
  }, [customersData]);
  const searchfunc = (e) => {
    // e.preventDefault();
    fetch("http://127.0.0.1:5000/view/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: searchValue,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setCustomerData(resp["customer"]);
      });
  };
  return (
    <>
      {customersData !== "" && (
        <div className="search-customer-container">
          <div className="search-header">
            <input
              type="text"
              placeholder="search for customer"
              name="search"
              list="customers"
              id="search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />

            <button type="submit" onClick={searchfunc}>
              Search
            </button>
            <datalist style={{}} id="customers" name="customers">
              {searchOption.map((x) => (
                <option value={x.cust_name}>{x.cust_name}</option>
              ))}
            </datalist>
          </div>
          {/* <h2>Search Customer</h2> */}
          <div className="search-content">
            <div>
              <div className="search-content-icon">
                <FaUser />
              </div>
              <div className="search-content-1">
                <span>User Name: {customersData.cust_name}</span>
                <span>First Name: {customersData.first_name}</span>
                <span>Last Name: {customersData.last_name}</span>
                <span>Account Created: {customersData.acc_created}</span>
                <span>Account Balance: ₹{customersData.balance}</span>
                <span>Email Id : {customersData.email_id}</span>
                <span>Phone No: {customersData.phone_no}</span>
              </div>
            </div>
            {/* <div className="search-content-2"></div> */}
          </div>
        </div>
      )}
    </>
  );
}
