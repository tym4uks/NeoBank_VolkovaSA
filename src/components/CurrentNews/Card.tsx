import { useState } from 'react';
import './Card.css';

interface CardData {
  id: number;
  title: string;
  content: string;
  img: string;
}

function Card({card, cardWidth}:{card:CardData, cardWidth: number}) {
return (
            <div key={card.id} className="Card_size">
              <img src={card.img} />
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
);
}

export default Card;