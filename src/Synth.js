import React, { Component } from 'react';
import Tone from 'tone';
import Keyboard from './Keyboard';
import './App.css';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synthOptions: {
        envelope : {
          attack : 0.01,
          decay : 0.01,
          sustain : 1,
          release : 10.0
        }
      },
    };

    this.updateSynthOptions = this.updateSynthOptions.bind(this);

  }

  updateSynthOptions(options) {
    this.setState({synthOptions: options});
  }

  generateSynth(options) {
    console.log(options);
    return new Tone.AMSynth(options).toMaster();
  }

  render() {
    return (
        <div className="Synth">
          <Keyboard synth={this.generateSynth(this.state.synthOptions)} synthOptions={this.state.synthOptions} updateSynthOptions={this.updateSynthOptions} />
        </div>
    );
  }
}

export default Synth;
