import React, { Component } from 'react';
import Key from './Key';
import OscillatorControls from './OscillatorControls';

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.pianoKeys = [
      {
        note: "C",
        keyType: "whiteKey"
      },
      {
        note: "C#",
        keyType: "blackKey"
      },
      {
        note: "D",
        keyType: "whiteKey"
      },
      {
        note: "D#",
        keyType: "blackKey"
      },
      {
        note: "E",
        keyType: "whiteKey"
      },
      {
        note: "F",
        keyType: "whiteKey"
      },
      {
        note: "F#",
        keyType: "blackKey"
      },
      {
        note: "G",
        keyType: "whiteKey"
      },
      {
        note: "G#",
        keyType: "blackKey"
      },
      {
        note: "A",
        keyType: "whiteKey"
      },
      {
        note: "A#",
        keyType: "blackKey"
      },
      {
        note: "B",
        keyType: "whiteKey"
      }
    ];

    this.state = {
      octaves: [],
      octaveCount: 3,
      lowOctave: 4,
      active: false
    };

    this.setOctaves = this.setOctaves.bind(this);
    this.buildKeyboard = this.buildKeyboard.bind(this);
    this.octaveUp = this.octaveUp.bind(this);
    this.octaveDown = this.octaveDown.bind(this);
    this.setKeyboardActive = this.setKeyboardActive.bind(this);
    this.setKeyboardInActive = this.setKeyboardInActive.bind(this);
    this.updateSynth = this.updateSynth.bind(this);
  }

  generateSynthOptions(updatedOptions) {
    return Object.assign(this.props.synthOptions, updatedOptions);
  }

  updateSynth(updatedOptions) {
    this.props.updateSynthOptions(this.generateSynthOptions(updatedOptions));
  }

  octaveUp () {
    this.setState({lowOctave: this.state.lowOctave + 1});
    this.setOctaves();
  }

  octaveDown () {
    this.setState({lowOctave: this.state.lowOctave - 1});
    this.setOctaves();
  }

  setOctaves () {
    let octaves = [];
    for (let i = 0;  i < this.state.octaveCount; i++) {
      octaves.push(this.state.lowOctave + i);
    }
    this.setState({octaves});
  }

  setKeyboardActive () {
    this.setState({active: true});
  }

  setKeyboardInActive () {
    this.setState({active: false});
  }

  componentDidMount() {
    this.setOctaves();
  }

  buildKeyboard() {
    if (!this.state.octaves.length) {
      return;
    }

    return this.state.octaves.map(octave => {
      return this.pianoKeys.map(keyInfo => {
        return <Key
            synth={this.props.synth}
            keyType={keyInfo.keyType}
            key={keyInfo.note + octave}
            octave={octave}
            note={keyInfo.note}
            active={this.state.active}
        />;
      });
    });
  }

  render() {
    return (
        <div id="keyboard" ref={node => this.node = node}>
          <div id="whiteKeyContainer"
               onMouseDown={this.setKeyboardActive}
               onMouseUp={this.setKeyboardInActive}
               onMouseLeave={this.setKeyboardInActive}
          >
            {this.buildKeyboard()}
            <div id="octaveContainer">
              <div id="octaveButtons">
                <div className="octaveButton" id="octaveUp" onClick={this.octaveUp}>Up</div>
                <div className="octaveButton" id="octaveDown" onClick={this.octaveDown}>Down</div>
              </div>
            </div>
          </div>


          Carrier Oscillator
          <OscillatorControls
              id="carrierControls"
              envelope={this.props.synthOptions.envelope}
              oscillator={this.props.synthOptions.oscillator}
              oscillatorName="oscillator"
              envelopeName="envelope"
              update={this.updateSynth}
          />

          Modulation Oscillator
          <OscillatorControls
              id="modulationControls"
              envelope={this.props.synthOptions.modulationEnvelope}
              oscillator={this.props.synthOptions.modulation}
              oscillatorName="modulation"
              envelopeName="modulationEnvelope"
              update={this.updateSynth}
          />
        </div>
    );
  }
}

export default Keyboard;
