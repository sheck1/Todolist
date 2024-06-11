import React from "react";
const d = new Date();
let day = d.getDate();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const m = new Date();
let name = month[m.getMonth()];
const year = new Date().getFullYear();

function Header() {
    return (
      <header>
        <h1>
        {day}, {name} {year}
        </h1>
      </header>
    );
  }
  
  export default Header;