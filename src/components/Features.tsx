import { useState } from 'react';
import './Features.css';

function Features() {
    return(
    <section className='features_section'>
        <div>
            <img src='Illustration 2.png'></img>
        </div>
        <div>
            <h2>We Provide Many Features You Can Use</h2>
            <p>You can explore the features that we provide with fun and have their own functions each feature</p>
            <ul>
                <li>Powerfull online protection.</li>
                <li>Cashback without borders.</li>
                <li>Personal design</li>
                <li>Work anywhere in the world</li>
            </ul>
        </div>
    </section>
    );
}

export default Features;