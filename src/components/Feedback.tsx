import { useState } from 'react';
import './Feedback.css';

function Feedback() {
    return(
    <section className='Feedback_section'>
        <p className='Feedback_support'>Support</p>
        <h3 className='Feedback_title_bold'>Subscribe Newsletter & get</h3>
        <h3 className='Feedback_title_light'>Bank News</h3>
    
    <div className='Feedback_subscribe'>
        <img src='email 1.svg'></img>
        <input type="text" placeholder='Your email'/>
        <button className='Feedback_button'><img src='Subscribe icon.svg'></img><span>Subscribe</span></button>
    </div>

    </section>
    );
}

export default Feedback;