import { useState } from 'react';
import './Footer.css';

function Footer() {
    return(
    <section className='footer_section'>
        <div>
            <img src='logo 1.svg'></img>
        </div>
        <div>
            <p>+7 (495) 984 25 13</p>
            <p>info@neoflex.ru</p>
        </div>
        <nav>
            <p>About bank</p>
            <p>Ask a Questions</p>
            <p>Quality of service</p>
            <p>Requisites</p>
            <p>Press center</p>
            <p>Bank career</p>
            <p>Investors</p>
            <p>Analytics</p>
            <p>Business amd Processes</p>
            <p>Compliance and business ethics</p>
        </nav>
    <p>We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings</p>
    </section>
    );
}

export default Footer;