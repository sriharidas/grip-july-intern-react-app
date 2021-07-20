import React, { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState("");
  const [field, setField] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/customers")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setCustomers(resp["customers"]);
        setField(resp["fields"]);
      });
  }, []);
  useEffect(() => {
    console.log(customers);
    console.log(field);
  }, [customers, field]);
  return (
    <>
      {field !== "" && customers !== "" && (
        <div className="customers-container">
          <h2>Our Customers</h2>
          <div className="customers-table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  {field.map((x) => (
                    <th>{x.split("_").join(" ")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((cust, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    {field.map((x) => (
                      <td>{cust[x]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
