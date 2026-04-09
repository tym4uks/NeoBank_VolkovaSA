import { useState } from 'react';
import './Design.css';

function Design() {
    const CARDS_PATH = '/assets';
return (
    <section className='design_section'>
        <div>
            <h2>Choose the design you like and apply for card right now</h2>
            <button>Choose the card</button>
        </div>
        <div className='design_section__div'>
            <img src={`${process.env.PUBLIC_URL}/cardImage1.png`}></img>
            <img src={`${CARDS_PATH}/cardImage2.png`}></img>
            <img src={`${CARDS_PATH}/cardImage3.png`}></img>
            <img src={`${CARDS_PATH}/cardImage4.png`}></img>
        </div>
    </section>
);
}

export default Design;