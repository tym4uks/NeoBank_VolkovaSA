import { useState, useEffect, useRef } from "react";
import "./CurrentNews.css";
import { PATHS } from "../../constants/paths";

interface NewsArticle {
  url: string;
  urlToImage: string | null;
  title: string;
  description: string | null;
}

function CurrentNews() {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, cards.length - 3);
  const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const getCardMetrics = {
    getCardWidth(defaultValue: number = 320): number {
      const cardElement = document.querySelector(".slider-card") as HTMLElement;
      return cardElement?.offsetWidth || defaultValue;
    },

    getCardGap(defaultValue: number = 0): number {
      const sliderElement = document.querySelector(
        ".slider-track",
      ) as HTMLElement;
      if (!sliderElement) return defaultValue;
      return parseFloat(
        getComputedStyle(sliderElement).getPropertyValue("gap"),
      );
    },
  };
  const cardWidth = getCardMetrics.getCardWidth();
  const cardGap = getCardMetrics.getCardGap();

  const getTranslateValue = () => {
    const totalWidth = cards.length * (cardWidth + cardGap) - cardGap;
    const containerWidth = containerRef.current?.clientWidth || 0;
    if (cards.length === 0 || totalWidth <= containerWidth) return 0;

    if (index === maxIndex) {
      return totalWidth - containerWidth;
    }
    return index * (cardWidth + cardGap);
  };
  const translateValue = getTranslateValue();

  useEffect(() => {
    fetch(`${PATHS.NEWS_API.BASE_URL}/top-headlines?country=us&pageSize=20`, {
      headers: { "X-Api-Key": PATHS.NEWS_API.KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        const validNews = data.articles.filter(
          (article: NewsArticle) =>
            article.urlToImage &&
            article.urlToImage !== "" &&
            article.urlToImage !== null,
        );
        setCards(validNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Загрузка...</div>;

  return (
    <section className="CurrentNews_section">
      <h3>Current news from the world of finance</h3>
      <p>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in
      </p>

      <div className="slider-container" ref={containerRef}>
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${translateValue}px)`,
          }}
        >
          {cards.map((card) => (
            <div key={card.url} className="slider-card">
              <img src={card.urlToImage || ""} />
              <h3>{card.title}</h3>
              <p>
                {card.description?.replace(/<[^>]*>/g, "") || "Нет описания"}
              </p>
              <a href={card.url} target="_blank" rel="noopener noreferrer">
                Читать далее ...
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button
          onClick={prev}
          disabled={index === 0}
          className="slider-btn prev-btn"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.6211 16.0928H9.46318V23.4842C9.46318 23.6772 9.21669 23.7582 9.10217 23.6028L0.621076 12.0928L9.10217 0.582708C9.21669 0.427282 9.46318 0.508285 9.46318 0.701347V8.09276H24.6211"
              stroke="#222222"
            />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={index === maxIndex}
          className="slider-btn next-btn"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8.09277H15.1579V0.701357C15.1579 0.508295 15.4044 0.427291 15.5189 0.582717L24 12.0928L15.5189 23.6028C15.4044 23.7583 15.1579 23.6773 15.1579 23.4842V16.0928H0"
              stroke="#222222"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default CurrentNews;
