import React, { Component } from 'react';
import Key from './Key';

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
      active: false,
      attack: this.props.synthOptions.envelope.attack,
      sustain: this.props.synthOptions.envelope.sustain,
      decay: this.props.synthOptions.envelope.decay,
      release: this.props.synthOptions.envelope.release
    };

    this.setOctaves = this.setOctaves.bind(this);
    this.buildKeyboard = this.buildKeyboard.bind(this);
    this.octaveUp = this.octaveUp.bind(this);
    this.octaveDown = this.octaveDown.bind(this);
    this.setKeyboardActive = this.setKeyboardActive.bind(this);
    this.setKeyboardInActive = this.setKeyboardInActive.bind(this);
  }

  generateSynthOptions() {
    return {
      envelope: {
        attack: this.state.attack,
        decay: this.state.decay,
        sustain: this.state.sustain,
        release: this.state.release
      }
    }
  }

  updateSynth() {
    this.props.updateSynthOptions(this.generateSynthOptions());
  }

  setAttack(value) {
    this.setState({attack: parseFloat(value.target.value)}, () => {
      this.updateSynth();
    });
  }

  getAttack() {
    return this.state.attack;
  }

  setSustain(value) {
    this.setState({sustain: parseFloat(value.target.value)}, () => {
      this.updateSynth();
    });
  }

  getSustain() {
    return this.state.sustain;
  }

  setDecay(value) {
    this.setState({decay: parseFloat(value.target.value)}, () => {
      this.updateSynth();
    });
  }

  getDecay() {
    return this.state.decay;
  }

  setRelease(value) {
    this.setState({release: parseFloat(value.target.value)}, () => {
    this.updateSynth();
    });
  }

  getRelease() {
    return this.state.release;
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

          <div id="asdrContainer">
            <div>ATTACK</div>
            <div className="asdrSlider">
              <input type="range" id="attack" className="slider" min=".01" max="2" value={this.getAttack()} onChange={(e) => {this.setAttack(e)}} step=".01" />
              <input type="text" id="attackValue" value={this.getAttack()} readOnly/>
            </div>
            <div>SUSTAIN</div>
            <div className="asdrSlider">
              <input type="range" id="sustain" className="slider" min=".01" max="2" value={this.getSustain()} onChange={(e) => {this.setSustain(e)}} step=".01" />
              <input type="text" id="sustainValue" value={this.getSustain()} readOnly/>
            </div>
            <div>DECAY</div>
            <div className="asdrSlider">
              <input type="range" id="decay" className="slider" min=".01" max="2" value={this.getDecay()} onChange={(e) => {this.setDecay(e)}} step=".01" />
              <input type="text" id="decayValue" value={this.getDecay()} readOnly/>
            </div>
            <div>RELEASE</div>
            <div className="asdrSlider">
              <input type="range" id="release" className="slider" min=".01" max="4" value={this.getRelease()} onChange={(e) => {this.setRelease(e)}} step=".01" />
              <input type="text" id="releaseValue" value={this.getRelease()} readOnly/>
            </div>
          </div>
        </div>
    );
  }
}

export default Keyboard;
