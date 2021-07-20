import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/home/Dashboard";
import Navbar from "./components/home/Navbar";
import Customers from "./components/customers/Customers";
import Search from "./components/customers/Search";
import History from "./components/transactionHistory/History";
import TransactionForm from "./components/transaction/TransactionForm";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/search" exact component={Search} />
          <Route path="/history" exact component={History} />
          <Route path="/transaction" exact component={TransactionForm} />
        </switch>
      </div>
    </Router>
  );
}

export default App;
