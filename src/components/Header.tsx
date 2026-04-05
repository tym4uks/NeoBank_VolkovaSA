import { useState } from 'react';
import './Header.css';

function Header() {
    return(
    <>
    <header>
        <h1>NeoBank</h1>
        <nav>
            <p>Credit card</p>
            <p>Product</p>
            <p>Account</p>
            <p>Resources</p>
        </nav>
        <button>Online Bank</button>
    </header>
    </>
    );
}

export default Header;