import { useState, useEffect, useRef } from 'react';
import './CurrentNews.css';

    const cards = [
    { id: 1, title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN', content: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is lessenergy i', img: "demo1 1.png" },
    { id: 2, title: "Jim Cramer explains what Wednesday's market action reveals about the state of inflation - CNBC Telev", content: "The 'Mad Money' host gave his take on what the market action on Wednesday suggests about inflation's", img: "demo2 1.png" },
    { id: 3, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
    { id: 4, title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN', content: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is lessenergy i', img: "demo1 1.png" },
    { id: 5, title: "Jim Cramer explains what Wednesday's market action reveals about the state of inflation - CNBC Telev", content: "The 'Mad Money' host gave his take on what the market action on Wednesday suggests about inflation's", img: "demo2 1.png" },
    { id: 6, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
     { id: 7, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
  { id: 8, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 { id: 9, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 { id: 10, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 { id: 11, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 { id: 12, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 { id: 13, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
 
    ];

function CurrentNews() {
    const [index, setIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3);
    const [cardWidth, setCardWidth] = useState(320);
    const [gap, setGap] = useState(80);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const maxIndex = cards.length - cardsToShow - 0.35;

    const next = () => setIndex(prev => Math.min(prev + 1, maxIndex));
    const prev = () => setIndex(prev => Math.max(prev - 1, 0));
    
 // Функция обновления параметров слайдера в зависимости от ширины экрана
  const updateSliderParams = () => {
    const width = window.innerWidth;
    
    // Определяем количество карточек и отступы
    if (width <= 500) {
      setCardsToShow(1);
      setGap(20);
    } else if (width <= 920) {
      setCardsToShow(2);
      setGap(30);
    } else {
      setCardsToShow(3);
      setGap(80);
    }
        // Получаем актуальную ширину карточки из CSS (через getComputedStyle)
    if (containerRef.current) {
      const cardElement = containerRef.current.querySelector('.slider-card');
      if (cardElement) {
        const styles = getComputedStyle(cardElement);
        const width = parseFloat(styles.width);
        setCardWidth(width);
      }
    }
  };

 useEffect(() => {
    // Первичная установка
    updateSliderParams();
    
    // Слушатель изменения размера окна
    window.addEventListener('resize', updateSliderParams);
    
    return () => {
      window.removeEventListener('resize', updateSliderParams);
    };

      }, []);

 // Сброс индекса, если текущий индекс выходит за пределы из-за изменения cardsToShow
  useEffect(() => {
    const newMaxIndex = cards.length - cardsToShow;
    if (index > newMaxIndex) {
      setIndex(Math.max(0, newMaxIndex));
    }
  }, [cardsToShow, index, cards.length]);

  // Вычисление сдвига: (ширина карточки + отступ) * индекс
  const translateValue = index * (cardWidth + gap);

return (
    <section className='CurrentNews_section'>
        
        <h3>Current news from the world of finance</h3>
        <p>We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in</p>
        
        <div className='slider-container' ref={containerRef}>
            <div className="slider-track" style={{ transform: `translateX(-${translateValue}px)` }}>
            {cards.map(card => (
                <div key={card.id} className="slider-card">
                <img src={card.img}/>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                </div>
            ))}
            </div>
        </div>

        <div className="slider-controls">
          <button onClick={prev}  disabled={index === 0} className="slider-btn prev-btn">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.6211 16.0928H9.46318V23.4842C9.46318 23.6772 9.21669 23.7582 9.10217 23.6028L0.621076 12.0928L9.10217 0.582708C9.21669 0.427282 9.46318 0.508285 9.46318 0.701347V8.09276H24.6211" stroke="#222222"/>
            </svg>
          </button>
          <button onClick={next} disabled={index === maxIndex} className="slider-btn next-btn">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8.09277H15.1579V0.701357C15.1579 0.508295 15.4044 0.427291 15.5189 0.582717L24 12.0928L15.5189 23.6028C15.4044 23.7583 15.1579 23.6773 15.1579 23.4842V16.0928H0" stroke="#222222"/>
            </svg>
          </button>
        </div>
        
    </section>
);
}

export default CurrentNews;