import { useEffect, useReducer, useState } from "react"

const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.INCREMENT:
      return { opacity: state.opacity + 1 }
    case ACTIONS.DECREMENT:
      return { opacity: state.opacity - 1 }
    default:
      return state
  }
}

export function NewQuote() {
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ]

    const [state, dispatch] = useReducer(reducer, { opacity: 1 })
    const [quoteInfo, setInfo] = useState({});
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    
  function increment() {
    dispatch({type: ACTIONS.INCREMENT})
  }
  
  function decrement() {
    dispatch({type: ACTIONS.DECREMENT})
  }

    useEffect(() => {
      ChangeColor();
      ChangeQuote();
    }, [])

    const ChangeQuote = () => {
        let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let quotes = data.quotes
                let randomNum = Math.floor(Math.random() * quotes.length);

                setInfo({
                  text: quotes[randomNum].quote,
                  author: quotes[randomNum].author,
                });
            })
    }

    const ChangeColor = () => {
      let randomNum = Math.floor(Math.random() * colors.length);
      setColor(colors[randomNum]);
      document.documentElement.style.setProperty('--main-color',color);
    }


    return (
      <div id="quote-box">
        <h1 id="text" style={{opacity: state.opacity}}><i className="fa fa-quote-left"></i>{quoteInfo.text}</h1>
            <p id="author" style={{opacity: state.opacity}}>-{quoteInfo.author}</p>
        <div className="btns">
          <div className="socials">
            <a href="#" id="tweet-quote" className="btn"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="btn"><i className="fa-brands fa-tumblr"></i></a>
          </div>
          <button id="new-quote" className="btn" onClick={() => {
            ChangeColor();
            decrement()
            setTimeout(ChangeQuote, 500)
            setTimeout(increment, 500)
          }}>New quote</button>
        </div>
      </div>
    )
}