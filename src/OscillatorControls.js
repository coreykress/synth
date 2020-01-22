import React, { Component } from 'react';

class OscillatorControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oscillatorName: this.props.oscillatorName,
      envelopeName: this.props.envelopeName,
      attack: this.props.envelope.attack,
      sustain: this.props.envelope.sustain,
      decay: this.props.envelope.decay,
      release: this.props.envelope.release,
      waveType: this.props.oscillator.type
    };
  }

  generateConfig() {
    let config = {};

    config[this.state.envelopeName] = {
      attack: this.getAttack(),
      sustain: this.getSustain(),
      decay: this.getDecay(),
      release: this.getRelease()
    };

    config[this.state.oscillatorName] = {
      type: this.getWaveType()
    };

    return config;
  }

  update() {
    this.props.update(this.generateConfig())
  }

  getAttack() {
    return this.state.attack;
  }

  getSustain() {
    return this.state.sustain;
  }

  getDecay() {
    return this.state.decay;
  }

  getRelease() {
    return this.state.release;
  }

  getWaveType() {
    return this.state.waveType;
  }

  setAttack(event) {
    this.setState({attack: parseFloat(event.target.value)}, () => {
      this.update();
    });
  }

  setSustain(event) {
    this.setState({sustain: parseFloat(event.target.value)}, () => {
      this.update();
    });
  }

  setDecay(event) {
    this.setState({decay: parseFloat(event.target.value)}, () => {
      this.update();
    });
  }

  setRelease(event) {
    this.setState({release: parseFloat(event.target.value)}, () => {
      this.update();
    });
  }

  setWaveType(event) {
    this.setState({waveType: event.target.value}, () => {
      this.update();
    });
  }

  render() {
    return (
        <div className="oscillatorControls">
          <div id="controlsContainer">
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

            <div id="waveContainer">
              <select value={this.getWaveType()} onChange={(e) => {this.setWaveType(e)}}>
                <option value="sine" >Sine</option>
                <option value="square" >Square</option>
                <option value="sawtooth" >Sawtooth</option>
                <option value="triangle" >Triangle</option>
              </select>
            </div>
          </div>
        </div>
    );
  }
}

export default OscillatorControls;
