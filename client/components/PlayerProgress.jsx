import React, { Component } from 'react';

class PlayerProgress extends Component {

  render(){
    const players = [];
    for (let playerId in this.props.playersWPM) {
      players.push(<div key={playerId}> {playerId}: {this.props.playersWPM[playerId]}</div>)
    }

    return (
      <div className='playerProgress'> 
        <div> Player Progress </div>
        {players}
      </div>
    )
  }
};

export default PlayerProgress; 