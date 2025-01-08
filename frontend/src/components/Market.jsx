import React, { useState } from 'react';
import axios from 'axios';

const Market = ({ token, market, fetchMarket }) => {
  const [filters, setFilters] = useState({ team: '', player: '', price: '' });
  const [playerToSell, setPlayerToSell] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  const applyFilters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/market', { params: filters });
      fetchMarket(response.data); // Pass filtered data to parent fetchMarket
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const addToMarket = async () => {
    try {
      await axios.post(
        'http://localhost:8000/market',
        { player: playerToSell.name, price: playerToSell.price },
        { headers: { Authorization: token } }
      );
      setMessage('Player added to market successfully!');
      fetchMarket();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const removeFromMarket = async (player) => {
    try {
      await axios.delete('http://localhost:8000/market', {
        headers: { Authorization: token },
        data: { player },
      });
      setMessage('Player removed from market successfully!');
      fetchMarket();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const buyPlayer = async (player) => {
    try {
      await axios.post(
        'http://localhost:8000/market/buy',
        { player },
        { headers: { Authorization: token } }
      );
      setMessage('Player purchased successfully!');
      fetchMarket();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h1>Transfer Market</h1>

      <div>
        <h2>Filters</h2>
        <input
          type="text"
          placeholder="Team"
          value={filters.team}
          onChange={(e) => setFilters({ ...filters, team: e.target.value })}
        />
        <input
          type="text"
          placeholder="Player"
          value={filters.player}
          onChange={(e) => setFilters({ ...filters, player: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div>
        <h2>Add Player to Market</h2>
        <input
          type="text"
          placeholder="Player Name"
          value={playerToSell.name}
          onChange={(e) => setPlayerToSell({ ...playerToSell, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Asking Price"
          value={playerToSell.price}
          onChange={(e) => setPlayerToSell({ ...playerToSell, price: e.target.value })}
        />
        <button onClick={addToMarket}>Add to Market</button>
      </div>

      {message && <p>{message}</p>}

      <div>
        <h2>Market Listings</h2>
        {market.map((item, index) => (
          <div key={index}>
            <p>
              Player: {item.player} | Team: {item.team} | Price: ${item.price}
            </p>
            <button onClick={() => buyPlayer(item.player)}>Buy</button>
            {item.team === token.email && (
              <button onClick={() => removeFromMarket(item.player)}>Remove</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
