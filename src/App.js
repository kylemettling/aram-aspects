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
    // console.log(process.env);
    // e.preventDefault();
    // fetch()
    let summonerName = "W 0 N D E R test";
    summonerName = encodeURIComponent(summonerName);
    // const regionString = "na1.api.riotgames.com";
    const requestString = axios(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    );

    // console.log(requestString);
    // const fullRequest = regionString.concat(requestString);
    // console.log(fullRequest);
    console.log("object");
    // const data = await requestString.data();
    const data = await requestString;
    // const puuid = data.config;
    // console.log(puuid);
    const getSummonerDetails = await axios(data.config.url);
    const puuid = getSummonerDetails.data.puuid;
    // console.log(puuid);
    console.log(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_KEY}`
    );
    const summonerRequest = axios(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_KEY}`
    );
    const summonerResponse = await summonerRequest;
    // setData(JSON.stringify(data.config.url));
    setData(JSON.stringify(summonerResponse.data));
    console.log(summonerResponse.data);
    // setData(puuid);
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
