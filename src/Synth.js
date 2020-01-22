import React, { Component } from 'react';
import Tone from 'tone';
import Keyboard from './Keyboard';
import './App.css';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.synth = null;

    this.state = {
      synthOptions: {
        oscillator: {
          type: "square"
        },
        envelope : {
          attack : 0.02,
          decay : 0.20,
          sustain : 0.3,
          release : 0.3
        },
        modulation : {
          type : "square"
        } ,
        modulationEnvelope : {
          attack : 0.5 ,
          decay : 0 ,
          sustain : 1 ,
          release : 0.5
        }
      },
    };

    this.updateSynthOptions = this.updateSynthOptions.bind(this);

  }

  updateSynthOptions(options) {
    this.setState({synthOptions: options});
    console.log('new options: ', this.state.synthOptions);
  }

  generateSynth(options) {
    if (this.synth) {
      this.synth.dispose();
    }

    console.log('making new synth', options);
    this.synth = new Tone.AMSynth(options).toMaster();

    return this.synth;
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
