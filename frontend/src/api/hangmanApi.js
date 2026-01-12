import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const startGame = async () => {
  const res = await axios.post(`${BASE_URL}/start`);
  return res.data;
};

export const guessLetter = async (gameId, letter) => {
  const res = await axios.post(`${BASE_URL}/guess`, {
    gameId,
    letter,
  });
  return res.data;
};
