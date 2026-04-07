import { useState } from 'react';
import './Feedback.css';

function Feedback() {
    return(
    <section className='Feedback_section'>
    <p style={{fontSize: '24px', color:'#EB801D', fontWeight:'700'}}>Support</p>
    <h3 style={{fontSize: '30px', fontWeight:'700'}}>Subscribe Newsletter & get</h3>
    <h3 style={{fontSize: '30px', fontWeight:'500'}}>Bank News</h3>
    
    <div className='Feedback_subscribe'>
        <img src='email 1.svg'></img>
        <input type="text" placeholder='Your email'/>
        <button className='Feedback_button'><img src='Subscribe icon.svg'></img><span>Subscribe</span></button>
    </div>

    </section>
    );
}

export default Feedback;