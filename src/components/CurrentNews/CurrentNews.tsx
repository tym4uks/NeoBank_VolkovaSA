import { useState } from 'react';
import './CurrentNews.css';
import CardSlider from './CardSlider'

function CurrentNews() {
    interface CardData {
    id: number;
    title: string;
    content: string;
    img: string;
    }
    
    const sampleCards: CardData[] = [
    { id: 1, title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN', content: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is lessenergy i', img: "demo1 1.png" },
    { id: 2, title: "Jim Cramer explains what Wednesday's market action reveals about the state of inflation - CNBC Telev", content: "The 'Mad Money' host gave his take on what the market action on Wednesday suggests about inflation's", img: "demo2 1.png" },
    { id: 3, title: "Dow futures tick higher after Wednesday's market rally - CNBC", content: "Dow futures inched higher in overnight trading after all the major averages posted sharp gains on th", img: "demo3 1.png" },
    { id: 4, title: "Bitcoin 'Might Rally Signifi", content: "Major coins rallied on", img: "demo4 1.png" },
    { id: 5, title: "Bitcoin 'Might Rally Signifi", content: "Major coins rallied on", img: "demo4 1.png" },
    { id: 6, title: "Bitcoin 'Might Rally Signifi", content: "Major coins rallied on", img: "demo4 1.png" }
    ];

return (
        <section className='CurrentNews_section'>
            <h3>Current news from the world of finance</h3>
            <p>We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in</p>
            <CardSlider cards={sampleCards} cardsToShow={4} gap={10} />
        </section>
);
}

export default CurrentNews;