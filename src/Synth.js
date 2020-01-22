import React, { Component } from 'react';
import Tone from 'tone';
import Keyboard from './Keyboard';
import './App.css';

class Synth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: new Tone.AMSynth().toMaster(),
    };
  }

  render() {
    return (
        <div className="Synth">
          <Keyboard synth={this.state.synth}/>
        </div>
    );
  }
}

export default Synth;
