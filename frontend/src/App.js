import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Team from './components/Team';
import Market from './components/Market';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [team, setTeam] = useState(null);
  const [market, setMarket] = useState([]);

  const handleAuth = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/auth', { email, password });
      console.log("--->reponse", response.data)
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const fetchTeam = async () => {
    console.log("-fetching team")
    try {
      const response = await axios.get('http://localhost:8000/team', {
        headers: { Authorization: token },
      });
      setTeam(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const fetchMarket = async () => {
    try {
      const response = await axios.get('http://localhost:8000/market');
      setMarket(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTeam();
      fetchMarket();
    }
  }, [token]);
  const handlePlayerPurchase = () => {
    fetchTeam();
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <div className="container mx-auto p-4">
      {!token ? (
        <AuthForm onAuth={handleAuth} />
      ) : (
        <div>
            <button
            onClick={handleLogout}
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <Team team={team} />
          <Market token={token} market={market} setMarket={setMarket} fetchMarket={fetchMarket} onPlayerPurchase={handlePlayerPurchase}/>

        </div>
      )}
    </div>
  );
};

export default App;
