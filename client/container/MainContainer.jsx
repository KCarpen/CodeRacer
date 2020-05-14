import React, { Component, useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx'
import InputField from '../components/InputField.jsx'
import CodeSnippet from '../components/CodeSnippet.jsx'
import CodeDisplay from '../components/CodeDisplay.jsx'
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
      inputValue : '',
      completedWords: [],
      hasRace: false,
      raceFinished: true,
      playersWPM : {},
      playerId: '',
      incomplete: '',
      complete: ''

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
    this.giveInputValue = this.giveInputValue.bind(this)
    this.giveCompletedWords = this.giveCompletedWords.bind(this)
    this.startRace = this.startRace.bind(this)
    this.raceFinished = this.raceFinished.bind(this)
    this.updatePlayersWPM = this.updatePlayersWPM.bind(this);
    this.setPlayerId = this.setPlayerId.bind(this);
    this.sendPlayersWPM = this.sendPlayersWPM.bind(this);
  }

  // update state to reflect the players socket Id
  setPlayerId(socketId) {
    console.log("passed socketId in setplayerid = ", socketId)
    // this.setState({...this.state, playerId : socketId});
    // newState['playerId'] = socketId
    // this.setState(state => {
    //   const newState = JSON.parse(JSON.stringify(state));
    //   newState.playerId = socketId;
    //   return newState;
    // })
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
    console.log("We are here, this is our state: ", JSON.stringify(this.state))
    const socketId = this.state.playerId;
    const newWPM = {};
    newWPM[socketId] = wpm;
    socket.emit('newWPM', newWPM);
  }
 
  raceFinished() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({hasRace: !this.state.hasRace})
  }

  giveInputValue(inputValue) {
    console.log(inputValue);
    console.log(this.state);
    if (this.state.incomplete.length) {
    this.setState({
      inputValue: inputValue, 
      complete: this.state.complete + this.state.incomplete[0],
      incomplete: this.state.incomplete.slice(1)
    })
  }  
}

  giveCompletedWords(completedWords) {
    this.setState({completedWords: completedWords})
  }

  startRace() {
    // console.log("This is our state of the race", this.state.hasRace)
    this.setState({hasRace: !this.state.hasRace})
  }

  // Loads all snippets of the category and randomly chooses one, also has properties other than the actual snippet (its meaning, category, max_time)
  handleClick(endpoint) {
    fetch(`/api/${endpoint}`)
      .then(snippet => snippet.json())
      // .then(json => console.log(json))
      .then(snippets => {
        const chosenSnippet = snippets[Math.floor(Math.random() * snippets.length)];
        console.log(chosenSnippet)
        this.setState({ content: chosenSnippet, : chosenSnippet.content })
      })
  // handleClick(endpoint) {
  //   fetch(`/api/${endpoint}`)
  //     .then(snippet => snippet.json())
  //     // .then(json => console.log(json))
  //     .then(snippets => {
  //       const chosenSnippet = snippets[Math.floor(Math.random() * snippets.length)];
  //       //console.log(chosenSnippet)
  //       this.setState({ content: chosenSnippet })
  //     })
  // }
  // NEW HANDLE CLICK
  handleClick(category){
    const length = snippets[category].length;
    const chosenSnippet = snippets[category][Math.floor(Math.random() * length)];
    console.log(chosenSnippet);
    this.setState({ content : chosenSnippet, incomplete: chosenSnippet[0] });
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
              giveCompletedWords = {this.giveCompletedWords}
              giveInputValue = {this.giveInputValue}
              startRace = {this.startRace}
              updatePlayersWPM = {this.updatePlayersWPM}
              sendPlayersWPM = {(wpm) => this.sendPlayersWPM(wpm)}
            />
      </div>
    )
  }
}

export default MainContainer;