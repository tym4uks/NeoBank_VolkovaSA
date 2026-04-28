import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>NeoBank</h1>
        </Link>
        <nav>
          <Link to="/loan">Credit card</Link>
          <Link to="/product">Product</Link>
          <Link to="/account">Account</Link>
          <Link to="/resources">Resources</Link>
        </nav>
        <button>Online Bank</button>
      </header>
    </>
  );
}

export default Header;
