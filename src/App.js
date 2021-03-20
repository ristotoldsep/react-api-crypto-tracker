import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './components/Coin';


function App() {
  //Define state coins, setCoins updates the state
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  //Pull data on page load
  useEffect(() => {
    axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => alert('Error connecting to the API'))
  }, []); //= render 1 time - without this it was an infinite loop

  //Function to handle change input
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  //Filter the searched coins
  const filteredCoins = coins.filter(coin => //THIS SYNTAX = RETURN THIS VALUE
    coin.name.toLowerCase().includes(search.toLowerCase()) //Lowercase the search input value
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <p className="tool-tip">Refresh for live updates!</p>
        <form>
          <input onChange={ handleChange } type="text" placeholder="Search" className="coin-input"/>
        </form>
      </div>
      
      {/* Passing the api data to coin component as props */}
      {filteredCoins.length > 0 ? (filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id} 
            name={coin.name} 
            price={coin.current_price} 
            image={coin.image} 
            symbol={coin.symbol} 
            marketCap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })) : (
      <p className="tool-tip">No cryptocurrencies found!</p>
      )}

    </div>
  );
}

export default App;
