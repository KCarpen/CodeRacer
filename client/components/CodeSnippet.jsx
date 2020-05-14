import React, { Component, useState, useEffect } from 'react';



const CodeSnippet = props => {
  // const [currentLine,setCurrentLine] = useState(0);
  // const [currentWordCheck,setCurrentWord] = useState(0);
  // const [currentIndex,setCurrentIndex] = useState(0);
  // const [completedPortion,setCompletedPortion] = useState('')
  // const typed = props.completedWords.join(' ');
  // console.log(typed);
  // If the user hasn't selected a category, render this:
  if (Object.keys(props.content).length === 0) {
    return (
      <div className='snippetContainer'>
        <div id="snippet">
          <p className = "crtSpecial" id='noText'>Please select a category to get started...</p>
        </div>
      </div>
    )
  }
  else {
    console.log(props.complete, props.incomplete)
    return (
      <div className='snippetContainer'>
        
        <div id="snippet">
          <span className="complete, green">{props.complete}</span>
          <span className="incorrect, red">{props.incorrect}</span>
          <span className="incomplete">{props.incomplete}</span>
        </div>
  
      </div>
    )
  }
}

export default CodeSnippet;
