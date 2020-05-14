import React, { Component, useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx'
import InputField from '../components/InputField.jsx'
import CodeSnippet from '../components/CodeSnippet.jsx'
import PlayerProgress from '../components/PlayerProgress.jsx'
import io from 'socket.io-client';
import snippets from '../../server/models/snippet.js'

const socket = io('http://localhost:3000');

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      content: [],
      wordsOfContent: [],
      inputValue : '',
      completedWords: [],
      hasRace: false,
      raceFinished: true,
      playersWPM : {},
      playerId: '',
      incomplete: '',
      complete: '',
      incorrect: '',

    }
    // scores = { socket.id : newWPM }
    socket.on('newScores', scores => {
      // update scores
      this.updatePlayersWPM(scores);
    });

    socket.on('mySocketId', socketId => {
      console.log('my socket id', socketId);
      this.setPlayerId(socketId);
    });

    this.handleClick = this.handleClick.bind(this)
    // this.giveInputValue = this.giveInputValue.bind(this)
    this.giveCompletedWords = this.giveCompletedWords.bind(this)
    this.startRace = this.startRace.bind(this)
    this.raceFinished = this.raceFinished.bind(this)
    this.updatePlayersWPM = this.updatePlayersWPM.bind(this);
    this.setPlayerId = this.setPlayerId.bind(this);
    this.sendPlayersWPM = this.sendPlayersWPM.bind(this);
    this.updateContentWords = this.updateContentWords.bind(this);
  }

  // update state to reflect the players socket Id
  setPlayerId(socketId) {
    console.log("passed socketId in setplayerid = ", socketId)
    const newState = {...this.state};
    newState.playerId = socketId;
    this.setState(newState);
    this.sendPlayersWPM('0.00');
  }

  // scores = { socket.id : newWPM }
  // build function to update playersWPM
  updatePlayersWPM(scores){
    const oldPlayersWPM = {...this.state.playersWPM};
    const newPlayersWPM = Object.assign(oldPlayersWPM, scores);
    this.setState(newPlayersWPM);
  }

  // update your score and then send request to server to update other clients scores with yours
  sendPlayersWPM(wpm){
    const newPlayersWPM = { ...this.state.playersWPM};
    newPlayersWPM[this.state.playerId] = wpm;
    this.setState({ playersWPM : newPlayersWPM });
    // console.log("We are here, this is our state: ", JSON.stringify(this.state))
    const socketId = this.state.playerId;
    const newWPM = {};
    newWPM[socketId] = wpm;
    socket.emit('newWPM', newWPM);
  }
 
  raceFinished() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({hasRace: !this.state.hasRace})
  }

//   giveInputValue(inputValue) {
//     // console.log('inputValue', inputValue);
//     // console.log(this.state);
//     if (this.state.incomplete.length) {
//     this.setState({
//       inputValue: inputValue, 
//       complete: this.state.complete + this.state.incomplete[0],
//       incomplete: this.state.incomplete.slice(1)
//     })
//   }  
// }

  giveCompletedWords(completedWords) {
    this.setState({completedWords: completedWords})
  }

  startRace() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({hasRace: !this.state.hasRace})
  }

  updateContentWords(words) {
    this.setState({wordsOfContent: [...words]})
  }

  // Loads all snippets of the category and randomly chooses one, also has properties other than the actual snippet (its meaning, category, max_time)
  // NEW HANDLE CLICK
  handleClick(category){
    const length = snippets[category].length;
    const chosenSnippet = snippets[category][Math.floor(Math.random() * length)];
    console.log('chosenSnippet first element before regex: ', chosenSnippet[0]);
    chosenSnippet[0] = chosenSnippet[0].replace(/\n/g, '')
    console.log('chosenSnippet first element after regex: ', chosenSnippet[0]);
    const splitContent = chosenSnippet[0].trim().split(/[ \t]+/)
    this.setState({ content : chosenSnippet, incomplete: chosenSnippet[0], wordsOfContent : splitContent });
  }

  // Shows the categories after the component is mounted
  // componentDidMount() {
  //   fetch(`/api/`)
  //     .then(category => category.json())
  //     .then(response => {
  //       const categoryArray = response.map(element => {
  //         return element.category
  //       });
  //       this.setState({ categories: categoryArray })
  //     })
  // }

  componentDidMount(){
    const categoryArray = Object.keys(snippets);
    this.setState({ categories : categoryArray });
  }

  resetMainState(){
    this.setState({ completedWords : []});
  }

  changeSnippet(object){
    if (this.state.incomplete){
      this.setState(object);
    }
  }

  render() {
    return (
      <div className='mainContainer'>
        <div className="mainTitle"> CODERACER</div>

          < NavBar 
              isRaceStarted = {this.state.hasRace} 
              categories ={ this.state.categories } 
              handleClick={ this.handleClick }
            />

          < PlayerProgress 
              playersWPM={this.state.playersWPM}
            />  
  
          < CodeSnippet
              playerId = {this.state.playerId} 
              content={ this.state.content } 
              inputValue = {this.state.inputValue} 
              complete = {this.state.complete} 
              incomplete = {this.state.incomplete}
              incorrect = {this.state.incorrect}
              completedWords = {this.state.completedWords}
            />
          
          {/* < CodeDisplay 
            playerId = {this.state.playerId} 
            content={ this.state.content } 
            complete = {this.state.complete} 
            incomplete = {this.state.incomplete}
            completedWords = {this.state.completedWords}
          /> */}
  
          < InputField 
              playerId = {this.state.playerId}
              wpm = {this.state.playersWPM[this.state.playerId]}
              content={this.state.content}
              complete={this.state.complete}
              incomplete={this.state.incomplete}
              incorrect={this.state.incorrect}
              changeSnippet={(object) => this.changeSnippet(object)}
              wordsOfContent={this.state.wordsOfContent}
              completedWords={this.state.completedWords}
              giveCompletedWords = {this.giveCompletedWords}
              giveInputValue = {this.giveInputValue}
              startRace = {this.startRace}
              updatePlayersWPM = {this.updatePlayersWPM}
              sendPlayersWPM = {(wpm) => this.sendPlayersWPM(wpm)}
              updateContentWords = {this.updateContentWords}
              resetMainState = {this.resetMainState}
            />
      </div>
    )
  }
}

export default MainContainer;