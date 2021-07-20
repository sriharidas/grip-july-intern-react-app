import React, { useEffect, useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsArrowUpLeft, BsArrowDownRight } from "react-icons/bs";
export default function TransactionStats() {
  const [userDetails, setUserDetails] = useState("");
  const [Transaction, setTransaction] = useState("");
  useEffect(() => {
    var status = 0;
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
        // console.log(resp);
        setUserDetails(resp["customer"]);
      });

    setTimeout(() => {
      fetch("http://127.0.0.1:5000/view/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          customer: {
            username: "haridas",
            acc_no: "10001",
          },
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          // console.log(resp);
          setTransaction(resp["transactions"]);
        });
    }, 1000);
  }, []);

  return (
    <>
      <div className="dashboard-user">Welcome {userDetails.cust_name}!</div>
      <div className="dashboard-stats">
        <div className="dashboard-stats-left">
          <h3>Balance</h3>
          <div className="dashboard-stats-container-left">
            <div className="icon">
              <MdAccountBalanceWallet />
            </div>
            <div className="stats-left-content">
              <span>Available Balance: ₹{userDetails.balance}</span>
              {/* <span> ₹10,000 </span> */}
            </div>
          </div>
        </div>
        <div className="dashboard-stats-right">
          <h3>Recent Transactions</h3>
          <div className="dashboard-stats-right-content">
            {Transaction !== "" && Transaction.length > 0 ? (
              Transaction.slice(-3).map((data) =>
                data.sender_username === userDetails.cust_name ? (
                  <div class="sent">
                    <span>
                      <BsArrowUpLeft />
                    </span>
                    <span>
                      <strong>You sent {data.reciever_username}</strong> ₹
                      <strong>{data.amount}</strong> on {data.date_of_trans}
                    </span>
                    {/* <span>{data.date_of_trans}</span> */}
                  </div>
                ) : data.reciever_username === userDetails.cust_name ? (
                  <div class="received">
                    <span>
                      <BsArrowDownRight />
                    </span>
                    <span>
                      you receieved ₹<strong>{data.amount}</strong> from{" "}
                      <strong>{data.sender_username}</strong> on{" "}
                      {data.date_of_trans}
                    </span>
                    {/* <span>{data.date_of_trans}</span> */}
                  </div>
                ) : (
                  <div>No Transactions</div>
                )
              )
            ) : (
              <div className="dashboard-stats-right-null">
                No Transactions yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
