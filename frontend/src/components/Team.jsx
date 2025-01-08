import React from 'react';

const Team = ({ team }) => (
<div className="my-6">
    <h1 className="text-2xl font-bold mb-4">Your Team</h1>
    {team ? (
      <div className="border border-gray-300 p-4 rounded">
        <p className="text-lg mb-4">Budget: ${team.budget}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.players.map((player, index) => (
            <li
              key={index}
              className="p-4 border border-gray-300 rounded shadow-sm"
            >
              <p className="font-bold">{player.name}</p>
              <p>Role: {player.role}</p>
              <p>Price: ${player.price}</p>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Loading team...</p>
    )}
  </div>
);

export default Team;
