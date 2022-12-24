import { React, useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import Header from "./Header";

function App() {
  // Setting up the initial states using react hook 'useState'

  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [query, setQuery] = useState("car");

  useEffect(() => {
    getMeaning();
  }, [query])

  // Function to fetch information on button
  // click, and set the data accordingly
  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`
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

  const getSearch = e => {
    e.preventDefault();
    setQuery(searchWord);
    //setSearch("");
  }
  return (
    <>
      <Header />
      <div className="container pb-5">
        <div className="d-flex flex-column align-items-center">
          <form onSubmit={getSearch} >
            <img id="booksImage" src={require("./books.jpg")} className="my-3" alt="books" width="450" />
            <div id="searchBox" class="my-4 mb-5 input-group">
              <input className="form-control" type="text" placeholder="Search..." onChange={(e) => { setSearchWord(e.target.value); }} />
              <button type="submit" className="btn btn-outline-danger input-group-text">
                <FaSearch size="20px" />
              </button>
            </div>
          </form>
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
                {data.meanings[0].definitions[0].example &&
                  <>
                    <h4>Example:</h4>
                    <p>{data.meanings[0].definitions[0].example}</p>
                  </>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
