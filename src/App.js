/* Import, damit auf den State zugegriffen werden kann */
import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

// Zugriff auf Quotes
let quoteDBurl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  /* hiermit kann auf den State zugegriffen werden */
  const [quote, setQuote] = useState("Our lives begin to end the day we become silent about things that matter.");
  const [author, setAuthor] = useState('Martin Luther King Jr.');
  const [quotesArray, setQuotesArray] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [accentColor, setAccentColor] = useState('#FF6633');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBurl);
  }, [quoteDBurl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randomInteger);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger]);
  }
  
  return (
    <div className="App">
      <header className="App-header" style={ {backgroundColor: accentColor} }>
        <div id="quote-box" style={ {color: accentColor} }>
          <p id="text">
          <FontAwesomeIcon icon={faQuoteLeft} />{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
        <div className='button'>
          <a style={ {backgroundColor: accentColor} } 
          id="tweet-quote" 
          href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}
          ><FontAwesomeIcon icon={faBell} /></a>
          <button style={ {backgroundColor: accentColor} } id="new-quote" onClick={() => getRandomQuote()}>
            Generate a random Quote
          </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;