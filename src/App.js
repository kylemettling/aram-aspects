// import logo from "./logo.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
const API_KEY = process.env.REACT_APP_API_KEY;
// import { useEffect } from 'react'

function App() {
  const [summonerName, setSummonerName] = useState("w 0 n d e r");
  const [data, setData] = useState("");

  useEffect(() => {
    // setData("");
  }, [data, summonerName]);

  async function submitInput(e) {
    let summonerName = "W 0 N D E R";
    summonerName = encodeURIComponent(summonerName);

    const requestString = axios(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    );

    const data = await requestString;
    const getSummonerDetails = await axios(data.config.url);
    const puuid = getSummonerDetails.data.puuid;

    console.log(puuid);
    console.log(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_KEY}`
    );
    const summonerRequest = axios(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=1&api_key=${API_KEY}`
    );
    const summonerResponse = await summonerRequest;
    const gamesList = summonerResponse.data;
    const gameData = {};

    for (const game of gamesList) {
      console.log(game);
      gameData[game] = await axios(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${game}?api_key=${API_KEY}`
      );
    }
    console.log(gameData);
    // const gameRequest = await axios.get(
    //   `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?count=5&api_key=${API_KEY}`
    // );
    // for()
    setData(JSON.stringify(gamesList));
  }

  return (
    <div className="App">
      <div className="searchBox"></div>
      <span>{data}</span>
      <input
        className="inputbox"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
      ></input>
      <button onClick={(e) => submitInput(e)} type="submit">
        Submit
      </button>
      <span>{data}</span>
    </div>
  );
}

export default App;
