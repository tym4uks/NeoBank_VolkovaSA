import { useState } from "react";
import "./Footer.css";
import { PATHS } from "../../constants/paths";

function Footer() {
  return (
    <footer>
      <section>
        <div className="footer_title">
          <img src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/logo.svg`}></img>
          <div>
            <a href="tel:+79459842513" className="footer_tel">
              +7 (495) 984 25 13
            </a>
            <br />
            <a href="mailto:info@neoflex.ru" className="footer_email">
              info@neoflex.ru
            </a>
          </div>
        </div>
        <nav>
          <a>About bank</a>
          <a>Ask a Questions</a>
          <a>Quality of service</a>
          <a>Requisites</a>
          <a>Press center</a>
          <a>Bank career</a>
          <a>Investors</a>
          <a>Analytics</a>
          <a>Business amd Processes</a>
          <a>Compliance and business ethics</a>
        </nav>
        <hr />
        <p>
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </p>
      </section>
    </footer>
  );
}

export default Footer;
