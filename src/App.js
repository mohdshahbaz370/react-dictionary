import { React, useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import Header from "./Header";

function App() {
  // Setting up the initial states using react hook 'useState'

  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("car");

  useEffect(() => {
    getMeaning();
  }, [searchWord])

  // Function to fetch information on button
  // click, and set the data accordingly
  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  // Function to play and listen the
  // phonetics of the searched word
  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="container-fluid pb-5">
      <Header />
      <div className="d-flex flex-column align-items-center">
        <img src={require("./books.jpg")} alt="books" width="450" />
        <div id="searchBox" class="my-4 w-50 mb-5 input-group">
          <input className="form-control" type="text" placeholder="Search..." onChange={(e) => { setSearchWord(e.target.value); }} />
          <button type="button" className="btn btn-outline-danger input-group-text" onClick={() => { getMeaning(); }}>
            <FaSearch size="20px" />
          </button>
        </div>
      </div>
      <div className="displayBox">
        {data && (
          <>
            <h2>
              {data.word}{" "}
              <button type="button" onClick={() => { playAudio(); }}>
                <FcSpeaker size="26px" />
              </button>
            </h2>
            <h4>Parts of speech:</h4>
            <p>{data.meanings[0].partOfSpeech}</p>
            <h4>Definition:</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>
            <h4>Example:</h4>
            <p>{data.meanings[0].definitions[0].example}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
