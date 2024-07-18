import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuote, toggleVisibility, editQuoteAuthenticity,
   setHighlightedQuote,  } from '../state/quotesSlice';



export default function Quotes() {
  // ✨ `quotes` must come from the Redux store
  const quotes = useSelector(st => st.quotesState.quotes);
  // ✨ `displayAllQuotes` must come from the Redux store
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes);
  // ✨ `highlightedQuote` must come from the Redux store
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote);
  const dispatch = useDispatch();
  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  {/* ✨ dispatch an action */ }
                  <button onClick={() => {
                    const actionToDispatch = deleteQuote(qt.id)
                    dispatch(actionToDispatch)
                  }}>DELETE</button>
                  {/* ✨ dispatch an action */ }
                  <button onClick={() => {
                    dispatch(setHighlightedQuote(qt.id))
                  }}>HIGHLIGHT</button>
                  {/* ✨ dispatch an action */ }
                  <button onClick={() => {
                    dispatch(editQuoteAuthenticity(qt.id))
                  }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {/* ✨ dispatch an action */ }
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
