import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Exchange.css';

interface CurrencyData {
  rate: number;
}

interface ApiResponse {
  [key: string]: CurrencyData;
}

interface ParsedResponse {
  rates: { [key: string]: number };
  date: string;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}
interface Rate extends Currency {
  value: number;
  rate: number;        // Курс 1 валюты к RUB

}
const CARDS_PATH = '/assets';
const APIS =  {
    name: 'floatrates',
    url: 'https://www.floatrates.com/daily/rub.json',
    getParams: () => ({}),
    parseResponse: (data: ApiResponse) => {
      const rates: { [key: string]: number } = {};
      const currenciesMap: { [key: string]: string } = { usd: 'USD', eur: 'EUR', gbp: 'GBP', cny: 'CNY', jpy: 'JPY', chf: 'CHF' };
      Object.keys(currenciesMap).forEach(key => {
        if (data[key]) {
          rates[currenciesMap[key]] = 1 / data[key].rate;
        }
      });
      return { rates, date: new Date().toISOString().split('T')[0] };
    }
  };

const formatDate = (date: Date | null | undefined):string => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

const Exchange: React.FC = () => {
  const currenciesList: Currency[] = [
    { code: 'USD', name: 'Доллар США', flag: '🇺🇸', symbol: '$' },
    { code: 'EUR', name: 'Евро', flag: '🇪🇺', symbol: '€' },
    { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧', symbol: '£' },
    { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳', symbol: '¥' },
    { code: 'JPY', name: 'Японская иена', flag: '🇯🇵', symbol: '¥' },
    { code: 'CHF', name: 'Швейцарский франк', flag: '🇨🇭', symbol: '₣' }
  ];

const [rates, setRates] = useState<Rate[]>([]);
const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchRates = () => {
    axios.get(APIS.url).then(response => {
      const parsed = APIS.parseResponse(response.data);
      const ratesWithDetails = currenciesList.map(currency => ({
        ...currency,
        rate: parsed.rates[currency.code],
        value: parsed.rates[currency.code]
      }));
      setRates(ratesWithDetails);
      setLastUpdate(new Date());
    });
  };

  useEffect(() => {
    fetchRates(); // Первая загрузка
    const interval = setInterval(fetchRates, 15 * 60 * 1000); // Каждые 15 минут
    return () => clearInterval(interval); // Очистка при размонтировании
  }, []);
  
    return(
        <section className='Exchange_section'>
        <div className='Exchange_header'>
            <h3>Exchange rate in internet bank</h3>
            <p>
            {lastUpdate && (
              <div className="last-update">
                <span>Update every 15 minutes, MSC: {formatDate(lastUpdate)}</span>
              </div>
            )}
            </p>
        </div>
        <div className='Exchange_header'>
        <p className="Exchange_p__Currency">Currency</p>
        </div>
        <div className='Exchange_body'>
            <div className='Exchange_grid'>
              {rates.map((rate: Rate) => (
                <article key={rate.code}>
                      <span className='Exchange_code'> {rate.code}: </span>
                      <span className='Exchange_rate'>
                        {rate.rate.toFixed(2)}
                      </span>
                </article>
              ))}
            </div>
            <img src={`${CARDS_PATH}/Group.svg`}></img>
        </div>
        <div className='Exchange_header'>
        <a>All courses</a>
        </div>
        </section>
    );
}

export default Exchange;