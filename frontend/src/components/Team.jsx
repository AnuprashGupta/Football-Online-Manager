import React from 'react';

const Team = ({ team }) => (
  <div>
    <h1>Your Team</h1>
    {team && (
      <div>
        <p>Budget: ${team.budget}</p>
        <ul>
          {team.players.map((player, index) => (
            <li key={index}>{player.name} - {player.role} - ${player.price}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default Team;
