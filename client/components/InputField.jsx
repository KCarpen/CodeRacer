import React, { Component, useState, useEffect, useRef } from 'react';
import Results from './Results.jsx'
import io from 'socket.io-client';
const socket = io('localhost:3000');

// calculatewpm = (typedCharacters/5) / endTime-startTime          *          60seconds / endTime-startTime

const InputField = props => {
  // I know I know. Why not use Redux? Because.
  // lots of hooks and lends to some back and forth messiness, good refactor opportunity probably?

  // If it includes "snippet" or "span", replace. -g
  const [startTime, setStartTime] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  // const [completedWords, setCompletedWords] = useState([]); // wont change
  // const [snippetSpace, setSnippetSpace] = useState([]); // wont change
  // const [snippetProp, setSnippetProp] = useState(''); // wont change
  const [countDown, setCountDown] = useState(5); // wont change
  const [raceStarted, setRaceStarted] = useState(false); // wont change
  const [activeCountDown, setActiveCountDown] = useState(false); // wont change
  const [wpmResults, setWpmResults] = useState({});
  const [isCorrect, setIsCorrect] = useState(true);

  // this is a custom made hook to allow the use of setInterval,
  // check the blog post of Dan Abramov about this for more info
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval for timer
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // literally just resets the state after race (called at the end of checkForErrors)
  // Also sends data to the database (WPM and snippet ID)
    // Sent to userController
  const resetState = () => {
    console.log("this is our final", wordsPerMinute);
    setStartTime(0);
    // setCompletedWords([]);
    // setSnippetSpace([]);
    // setSnippetProp('');
    setRaceStarted(false);
    setCountDown(5);
    props.startRace();
    props.giveCompletedWords([]);
    props.changeSnippet('');
    // console.log('You win!')
    document.getElementById('timer').innerHTML= 'FINISHED';
    // console.log("this is our full props.content", props.content)
    // fetch(`/api/highScore`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // replace snippet with username
    //   body: JSON.stringify({wordsPerMinute: wordsPerMinute, snippet_id: props.content.snippet_id})
    // })
    // .then((response) => response.json())
    // .then((response) => {
    //   setWordsPerMinute(0)
    //   //response has keys message, wpm
    //   setWpmResults(response)
    // })
  }


  // stop player from typing prior to start of race
  const isRaceOn = (e) =>{
    if(!raceStarted){
      e.target.value = ''
      // props.changeSnippet()
    }
    return e;
  }

// this is needed to ensure that if the content of the code snippet changes that the appropriate props are updated.
//   useEffect(() => {
//     console.log('props content', props.content)
//     console.log('snippet space', snippetSpace);
//     console.log('')
//     if (snippetSpace.length === 0 && props.content[0]) {
//       setSnippetSpace(space => space = props.content[0].trim().split(/[ \t]+/));
//       setSnippetProp(snip => snip = props.content[0]);
//   }
// })
  
// console.log('snippetprop', snippetProp)
  // Lets you change category after you already selected one and changes the state accordingly
  // if (props.content[0] && snippetSpace.length === 0) {
  //   console.log('props content', props.content);
  //   // console.log('split contents', props.content.content.split(' '))
  //   // if (snippetProp != props.content[0]) {
  //     setSnippetSpace(space=>space=props.content[0].trim().split(/[ \t]+/));
  //     console.log('snippetSpace', snippetSpace);
  //     // setSnippetProp(snip => snip = props.content[0]);
  //   // }
  // }
  const newCheckForErrors = (event) => {
    let incompletedChars = props.incomplete;
    let incorrectChars = props.incorrect;
    let completedChars = props.complete;

    if (event.target.value === '') return;
    // backspace logic
    // console.log('EVERYTHING I TYPED ', event.target.value);
    console.log("LENGTH AFTER BACKSPACE ", event.target.value.length);
    console.log("COMPLETED CHARS LENGTH ", completedChars.length);
    console.log("INCORRECT CHARS LENGTH ", incorrectChars.length);
    console.log("BACKSPACE RETURN VALUE ", event.target.value[event.target.value.length-1] )

    if (event.target.value.length < completedChars.length + incorrectChars.length){
      console.log('HIT A BACKSPACE');
      if (incorrectChars.length){
        const backspacedChar = incorrectChars[incorrectChars.length - 1];
        incorrectChars = incorrectChars.slice(0, incorrectChars.length - 1);
        incompletedChars = backspacedChar + incompletedChars;
      } else {
        const backspacedChar = completedChars[completedChars.length - 1];
        completedChars = completedChars.slice(0, completedChars.length - 1);
        incompletedChars = backspacedChar+ incompletedChars;
      }
      // console.log(props.content[0]);
      if (completedChars === props.content[0].slice(0, completedChars.length)){
        setIsCorrect(true);
      }
      const renderedChars = { complete: completedChars, incorrect: incorrectChars, incomplete: incompletedChars };
      props.changeSnippet(renderedChars);
      return
    }

    let currentChar = event.target.value[event.target.value.length-1];

    if (isCorrect === true) {
      if (currentChar !== incompletedChars[0]){
        setIsCorrect(false);
        incorrectChars += incompletedChars[0];
        incompletedChars = incompletedChars.slice(1);
      }
      if (currentChar === incompletedChars[0]){
        completedChars += currentChar;
        incompletedChars = incompletedChars.slice(1);
      }
    } else {
      incorrectChars += incompletedChars[0];
      incompletedChars = incompletedChars.slice(1);
    }
      const renderedChars = { complete: completedChars, incorrect: incorrectChars, incomplete: incompletedChars };
      props.changeSnippet(renderedChars);

    // if (completedChars === props.content[0]){
    //   return resetState();
    // }
  }


  // const oldCheckForErrors = (event) => {
  //   // we won't care about tabbing in our text or spaces, so we process the code snippet accordingly.
  //   // console.log("we are doing something")
  //   // let snippetWords = snippetSpace;
  //   console.log("Snippet words", props.wordsOfContent)
  //   let wholeWord = event.target.value;
  //   console.log("wholeWord",wholeWord)
  //   let lastInput = wholeWord[wholeWord.length-1];
  //   console.log('lastInput', lastInput)

  //   // currentWord = array of current snippet words at index 0
  //   const currentWord = props.wordsOfContent[0];
  //   console.log('current', currentWord);
  //   // Gets rid of empty spaces from linebreaks, etc.
  //   if (currentWord === "" || currentWord === "\n") {
  //     let finishedWords = [...completedWords , currentWord];
  //       event.target.value = '';
  //       let remainingWords = [...props.wordsOfContent.slice(1)];
  //       // setSnippetSpace(remainingWords);
  //       props.updateContentWords(remainingWords);
  //       setCompletedWords(finishedWords);
  //       props.giveInputValue('');
  //       props.giveCompletedWords(finishedWords);
  //   }
  //   // console.log("current word",currentWord)

  //   // ///////////////////////////
  //   // // Actual functionality is here, checks currently typed word after pressing spacebar
  //   // /////////////////////////////////////

  //   if (lastInput === ' ' || lastInput === "\n") {
  //     // console.log("We got a match")
  //     // console.log(wholeWord.trim(),"===", currentWord)
  //     // If the inputted word(trimmed of any spaces) matches the array of snippet words at index(trimmed of any spaces)
  //     if (wholeWord.trim() === currentWord.trim()) {
  //       // console.log("WE MATCHED OUR TRIM")
  //       // slice snippetwords by first index, assigned to remainingWords
  //       let remainingWords = [...props.wordsOfContent.slice(1)];
  //       // console.log(remainingWords)
  //       //If there are no more remaining words, call the function to resetState/end the game
  //       if (remainingWords.length === 0) {
  //         event.target.value = '';
  //         return resetState();
  //       }
  //       // updates finishedWords array to keep track of progress
  //       let finishedWords = [...completedWords , currentWord];
  //       // resets textArea
  //       event.target.value = '';
  //       // Reassign/update SnippetSpace and CompletedWords to keep track of progress
  //       props.updateContentWords(remainingWords);
  //       setCompletedWords(finishedWords);
  //       props.giveCompletedWords(finishedWords);
  //       props.giveInputValue('');
  //     }
  //     else {
  //       event.target.value = wholeWord.trim();
  //     }
  //   }
  //   else {
  //     props.giveInputValue(wholeWord);
  //     // update wholeWord
  //     //update lastInput
  //   }
  
  // }

  //establishes start time upon termination of the starting clock 
  const startRace = () => {
    if (startTime === 0) {
      setStartTime(prevTime => Date.now());
      console.log("GO! CURRENT TIME IS",startTime);
    }
    setRaceStarted(raceStarted => raceStarted = true);
  }
  

  //calculates approximate, live wpm
  const calculateWPM = (event) =>{
    console.log("??")
    if(raceStarted) {
      // let inputLength = completedWords.reduce((acc,curr) => {
      //   acc = acc + curr.length;
      //   return acc;
      // }, 0);
      let words = props.complete.length/5;
      let elapsedTime = Date.now() - startTime;
      let minute = 60000;
      let wpm = (words * minute) / elapsedTime;
      // setWordsPerMinute((wpm.toFixed(2)));
      console.log(wpm);
      props.sendPlayersWPM((wpm.toFixed(2)));
    }
  }

  //turns on the "useinterval custom hook to begin the initial countdown"
  const beginCountdown = (e) => {
    if(raceStarted || activeCountDown) {
      return;
    }
    setActiveCountDown(active => active = true);
    props.startRace();
  }

  // Adds the countdown timer to the page
  useInterval(() => {
    if (activeCountDown) {
      document.getElementById('timer').innerHTML= `Starts in ... ${countDown}`;
      if (countDown > 0) {
        setCountDown(time => time-1);
      }
      else {
        document.getElementById('timer').innerHTML= 'GO!';
        setActiveCountDown(active => active = false);
        startRace();
      }
    }

  }, activeCountDown ? 1000 : null);


  // If there is a snippet, lets you actually type in the textarea, otherwise, it's just an empty box that does nothing onclick
  let textArea;
  if (props.content.length) {
    textArea = (
      <textarea 
        id='textInput' 
        placeholder="Click Here to Start The CODERACE"
        onFocus ={beginCountdown} 
        onInput={(e) => { 
          const modifiedEvent = isRaceOn(e);
          newCheckForErrors(modifiedEvent);  
          calculateWPM(e); 
          }}
        // onKeyDown={(e) => {
        //   const modifiedEvent = isRaceOn(e);
        //   newCheckForErrors(modifiedEvent);
        //   calculateWPM(e);
        //   // console.log('onKEYDOWN value', e.target.value[e.target.value.length-1]);
        //   // console.log('onKEYDOWN code', e.keyCode);
        // }} 
          >
      </textarea>)
  } else {
    textArea = (<textarea id='textInput' placeholder="You need a code snippet to race" disabled></textarea>)
  }

  return (
    <div className='inputContainer'>
      <div id='timer'></div>
      {textArea}

      <p id='currentWPM'>
        {/* Current WPM */}
        current WPM: {props.wpm}
      </p>
  
        <Results finishedWPM={wpmResults} content={ props.content } />

    </div>
  )
}

export default InputField;