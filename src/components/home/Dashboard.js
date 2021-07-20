import React from "react";
import Cards from "./Cards";
import TransactionStats from "./TransactionStats";

export default function Dashboard() {
  return (
    <div className="dashboard-main-container">
      <TransactionStats />
      <Cards />
    </div>
  );
}
