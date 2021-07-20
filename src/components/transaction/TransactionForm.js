import React, { useEffect, useState } from "react";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    sender_username: "",
    sender_acc_no: "",
    reciever_username: "",
    reciever_acc_no: "",
    amount: "0",
  });
  const [userData, setUserData] = useState("");
  const [userOptions, setUserOptions] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/view/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        customer: "haridas",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setUserData(resp["customer"]);
      });
    setTimeout(() => {
      fetch("http://127.0.0.1:5000/customers")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          // setCustomerData(resp["customers"]);
          setUserOptions(resp["customers"]);
        });
    }, 1000);
  }, []);
  const changeHandler = (e) => {
    e.preventDefault();
    var acc = "";

    if (e.target.name === "amount") {
      setFormData((prevState) => ({
        ...prevState,
        sender_username: userData.cust_name,
        sender_acc_no: userData.acc_no,
        [e.target.name]: e.target.value,
      }));
    } else {
      userOptions.map((x) => {
        if (x.cust_name === e.target.value) {
          acc = x.acc_no;
          // document.getElementById("reciever_acc_no").value = acc;
        }
      });
      console.log("Acc", acc);
      setFormData((prevState) => ({
        ...prevState,
        sender_username: userData.cust_name,
        sender_acc_no: userData.acc_no,
        reciever_username: e.target.value,
        reciever_acc_no: acc,
      }));
    }
    // console.log(formData);
  };
  const Transfer = (e) => {
    e.preventDefault();
    // e.target.reset();
    if (userData.balance > formData.amount) {
      console.log(
        JSON.stringify({
          transaction: formData,
        })
      );
      fetch("http://127.0.0.1:5000/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*",
        },
        body: JSON.stringify({
          transaction: formData,
        }),
      }).then((resp) => console.log(resp));
      alert("Transaction successful");
    } else alert("Not enough balance :(");
  };
  return (
    <>
      {userData !== "" && userOptions !== "" && (
        <div className="transaction-content">
          <h2>Transaction </h2>
          <div className="transaction-content-main">
            <div className="transaction-content-header">
              {/* <span>: </span> */}
              <span>Available Balance: ₹{userData.balance}</span>
            </div>
            <div className="form-wrapper">
              {/* <p>Fill the below form transaction </p> */}
              <form onSubmit={Transfer}>
                <p className="result"></p>

                <div className="form-group">
                  <label htmlFor="sender_username">Sender name</label>
                  <input
                    id="sender_username"
                    name="sender_username"
                    value={userData.cust_name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sender_acc_no">Sender's Account Number</label>
                  <input
                    id="sender_acc_no"
                    name="sender_acc_no"
                    value={userData.acc_no}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reciever_username">Receiver name</label>
                  <input
                    name="reciever_username"
                    id="reciever_username"
                    placeholder="Enter the reciever's name"
                    onChange={changeHandler}
                    value={formData.reciever_username}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reciever_acc_no">
                    Receiver's Account Number
                  </label>
                  <input
                    id="reciever_acc_no"
                    name="reciever_acc_no"
                    onChange={changeHandler}
                    placeholder="Reciever's account number"
                    value={formData.reciever_acc_no}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    name="amount"
                    id="amount"
                    placeholder="Enter the amount"
                    onChange={changeHandler}
                    value={formData.amount}
                  />
                </div>
                <input type="submit" value="Transfer" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
