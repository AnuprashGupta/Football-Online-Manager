import React, { useState } from 'react';
import axios from 'axios';

const Market = ({ token, market, fetchMarket, onPlayerPurchase }) => {
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
      onPlayerPurchase();
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transfer Market</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Team"
            value={filters.team}
            onChange={(e) => setFilters({ ...filters, team: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Player"
            value={filters.player}
            onChange={(e) => setFilters({ ...filters, player: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Player to Market</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Player Name"
            value={playerToSell.name}
            onChange={(e) => setPlayerToSell({ ...playerToSell, name: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Asking Price"
            value={playerToSell.price}
            onChange={(e) => setPlayerToSell({ ...playerToSell, price: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={addToMarket}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add to Market
          </button>
        </div>
      </div>

      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <div>
        <h2 className="text-xl font-semibold mb-2">Market Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {market.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded shadow-sm hover:shadow-md"
            >
              <p className="font-bold">Player: {item.player}</p>
              <p>Team: {item.team}</p>
              <p>Price: ${item.price}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => buyPlayer(item.player)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Buy
                </button>
                {item.team === token.email && (
                  <button
                    onClick={() => removeFromMarket(item.player)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
