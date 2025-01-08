export const INITIAL_BUDGET = 5000000;
export const generatePlayers = () => {
  const INITIAL_PLAYERS = {
    goalkeepers: 3,
    defenders: 6,
    midfielders: 6,
    attackers: 5
  };

  const players = [];
  const roles = Object.keys(INITIAL_PLAYERS);

  roles.forEach(role => {
    for (let i = 0; i < INITIAL_PLAYERS[role]; i++) {
      players.push({
        name: `${role}_${i + 1}`,
        role,
        price: Math.floor(Math.random() * 100000) + 50000
      });
    }
  });
  return players;
};