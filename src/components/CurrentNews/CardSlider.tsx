import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import './CardSlider.css';

interface CardData {
  id: number;
  title: string;
  content: string;
  img: string;
}

interface SliderProps {
  cards: CardData[];
  cardsToShow?: number;
  gap?: number;
}

function CardSlider({ 
  cards, 
  cardsToShow = 3, 
  gap = 20 
}:SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Вычисляем ширину карточки
  useEffect(() => {
    const calculateCardWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.parentElement?.clientWidth || 0;
        const totalGap = gap * (cardsToShow - 1);
        const width = (containerWidth - totalGap) / cardsToShow;
        setCardWidth(width);
      }
    };

    calculateCardWidth();
    window.addEventListener('resize', calculateCardWidth);
    
    return () => window.removeEventListener('resize', calculateCardWidth);
  }, [cardsToShow, gap]);

  const maxIndex = Math.max(0, cards.length - cardsToShow);
  
  const handlePrev = () => {
    if (isTransitioning || currentIndex === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (isTransitioning || currentIndex >= maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const getTransformValue = () => {
    const offset = currentIndex * (cardWidth + gap);
    return `translateX(-${offset}px)`;
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <h2>Наш слайдер</h2>
      </div>
      
      <div className="slider-wrapper">
        <div 
          ref={sliderRef}
          className="slider-track"
          style={{
            transform: getTransformValue(),
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            gap: `${gap}px`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {cards.map((card) => (
            <Card card={card} cardWidth={cardWidth} />
          ))}
        </div>
      </div>
              <div className="slider-controls">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0 || isTransitioning}
            className="slider-btn prev-btn"
          >
            <img src='Left.svg'></img>
          </button>
          <button 
            onClick={handleNext} 
            disabled={currentIndex >= maxIndex || isTransitioning}
            className="slider-btn next-btn"
          >
            <img src='Right.svg'></img>
          </button>
        </div>
    </div>
  );
};
export default CardSlider;