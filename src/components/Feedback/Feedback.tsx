import { useState } from 'react';
import './Feedback.css';

function Feedback() {
    const CARDS_PATH = '/assets';
    return(
    <section className='Feedback_section'>
        <a className='Feedback__support'>Support</a>
        <a className='Feedback__title_bold'>Subscribe Newsletter & get</a>
        <a className='Feedback__title_light'>Bank News</a>
        <div className='Feedback__subscribe'>
            <img src={`${CARDS_PATH}/email 1.svg`}></img>
            <input type="text" placeholder='Your email'/>
            <button className='Feedback__button'><img src={`${CARDS_PATH}/Subscribe icon.svg`}></img><span>Subscribe</span></button>
        </div>

    </section>
    );
}

export default Feedback;