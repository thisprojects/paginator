import React from "react";
import List from "./List";
import "./App.css";

const users = [
  { name: "Bill", department: "Operations", office: "London" },
  { name: "Joe", department: "HR", office: "London" },
  { name: "Jules", department: "HR", office: "London" },
  { name: "Debbie", department: "Comms", office: "Oxford" },
  { name: "Donald", department: "Operations", office: "Oxford" },
  { name: "Arthur", department: "Operations", office: "London" },
  { name: "Gertie", department: "Comms", office: "London" },
  { name: "Gerald", department: "Operations", office: "London" },
  { name: "Rebecca", department: "Marketing", office: "Oxford" },
  { name: "Benjamin", department: "Operations", office: "London" },
  { name: "Alan", department: "Marketing", office: "London" },
  { name: "Agnes", department: "Dispatch", office: "London" },
  { name: "Georgina", department: "Dispatch", office: "Oxford" },
  { name: "Karen", department: "Comms", office: "London" },
  { name: "Steve", department: "Operations", office: "London" },
  { name: "Andrew", department: "Accounts", office: "Oxford" },
  { name: "David", department: "Accounts", office: "London" },
  { name: "Sarah", department: "IT", office: "London" },
  { name: "Claire", department: "IT", office: "Oxford" },
  { name: "Robert", department: "Operations", office: "London" },
];

function App() {
  return (
    <div className="App">
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={3} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={5} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={7} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={9} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={12} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={15} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={users} initialItemsPerPage={21} />
      </div>
    </div>
  );
}

export default App;
