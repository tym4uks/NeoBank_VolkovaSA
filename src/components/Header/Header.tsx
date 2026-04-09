import { useState } from 'react';
import './Header.css';

function Header() {
    return(
    <>
    <header>
        <h1>NeoBank</h1>
        <nav>
            <a>Credit card</a>
            <a>Product</a>
            <a>Account</a>
            <a>Resources</a>
        </nav>
        <button>Online Bank</button>
    </header>
    </>
    );
}

export default Header;