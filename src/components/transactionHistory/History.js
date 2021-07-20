import React, { useEffect, useState } from "react";
// import { BsArrowDownRight, BsArrowUpLeft } from "react-icons/bs";

export default function History() {
  const [Transaction, setTransaction] = useState("");
  useEffect(() => {
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
        console.log(resp);
        setTransaction(resp);
      });
  }, []);

  return (
    <div className="customers-table-container history-content">
      <table>
        <thead>
          <tr>
            {Transaction !== "" &&
              Transaction.columns.map((x) => <th>{x.split("_").join(" ")}</th>)}
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
        {Transaction !== "" &&
          Transaction.transactions.map((data) =>
            data["sender_username"] === "haridas" ? (
              <tr className="sent-row">
                {Transaction.columns.map((x) =>
                  x === "amount" ? <td>₹ {data[x]}</td> : <td>{data[x]}</td>
                )}
                <td>sent</td>
              </tr>
            ) : (
              <tr className="recieved-row">
                {Transaction.columns.map((x) =>
                  x === "amount" ? <td>₹ {data[x]}</td> : <td>{data[x]}</td>
                )}
                <td>received</td>
              </tr>
            )
          )}
      </table>
    </div>
  );
}
