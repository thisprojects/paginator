import React, { useState } from "react";
import List from "./List";
import "./App.css";

const array = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

const objArray = [
  { entry: "one" },
  { entry: "two" },
  { entry: "three" },
  { entry: "four" },
  { entry: "five" },
  { entry: "six" },
  { entry: "seven" },
  { entry: "eight" },
  { entry: "nine" },
  { entry: "ten" },
  { entry: "eleven" },
  { entry: "twelve" },
  { entry: "thirteen" },
  { entry: "fourteen" },
  { entry: "fifteen" },
  { entry: "sixteen" },
  { entry: "seventeen" },
  { entry: "eighteen" },
  { entry: "nineteen" },
  { entry: "twenty" },
  { entry: "twentyOne" },
];

function App() {
  return (
    <div className="App">
      <div className="listWrapper">
        <List arrayToPaginate={objArray} initialItemsPerPage={3} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={objArray} initialItemsPerPage={5} />
      </div>
      <div className="listWrapper">
        <List
          arrayToPaginate={objArray}
          initialItemsPerPage={7}
          zub={"Hello"}
        />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={objArray} Î initialItemsPerPage={9} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={objArray} initialItemsPerPage={12} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={objArray} initialItemsPerPage={15} />
      </div>
      <div className="listWrapper">
        <List arrayToPaginate={objArray} initialItemsPerPage={21} />
      </div>
    </div>
  );
}

export default App;
