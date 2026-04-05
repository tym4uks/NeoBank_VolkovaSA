import React from 'react';
import Header from './components/Header';
import Design from './components/Design';
import Features from './components/Features';
import Exchange from './components/Exchange';
import MapServices from './components/MapServices';
import CurrentNews from './components/CurrentNews';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

import './App.css';

function App() {
return (
<>
{/* Заголовок */}
<Header/>


{/* Основная информация */}
<main>
  <Design />
  <Features />
  <Exchange/>
  <MapServices/>
  <CurrentNews />
  <Feedback />
</main>


{/* Подвал */}
<Footer/>

</>
);
}

export default App;