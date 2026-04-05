import { useState } from 'react';
import './Card.css';

interface CardProps {
    id: number;
    url: string;
    title: string;
    content: string;
}

function Card({photo}:{photo:CardProps}) {
return (
            <div key={photo.id} className="card">
                <img src={photo.url}/>
                <p className="card-title">{photo.title}</p>
                <p className="card-content">{photo.content}</p>
            </div>
);
}

export default Card;