import { useState } from 'react';
import './Design.css';

function Design() {
return (
    <section className='design_section'>
        <div>
            <h1>Choose the design you like and apply for card right now</h1>
            <button>Choose the card</button>
        </div>
        <div className='design_section__div'>
            <img src="cardImage1.png"></img>
            <img src="cardImage2.png"></img>
            <img src="cardImage3.png"></img>
            <img src="cardImage4.png"></img>
        </div>
    </section>
);
}

export default Design;