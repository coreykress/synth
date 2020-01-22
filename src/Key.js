import React, { Component } from 'react';

class Key extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyActive: false,
    };

    this.getClasses = this.getClasses.bind(this);
    this.getNote = this.getNote.bind(this);
    this.playNote = this.playNote.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  mouseDown() {
    // this.setState({keyActive: true});
    this.playNote();
  }
  mouseEnter() {
    if (this.state.keyActive) {
      return;
    }
    //TODO: setup to do drag playing i.e. gliss
    if (this.props.active) {
      this.setState({keyActive: true});
      console.log(this.props.note);
      // currently crashing browser
      //this.playNote();
    }
  }

  getNote() {
    return this.props.note + this.props.octave;
  }

  playNote() {
    this.props.synth.triggerAttack(this.getNote());
  }

  releaseNote() {
    this.setState({keyActive: false});
    this.props.synth.triggerRelease();
  }

  getClasses() {
    return 'key ' + this.props.keyType;
  }

  render() {
    return (
        <div
            className={this.getClasses()}
            ref={node => this.node = node}
            onMouseDown={this.mouseDown}
            onMouseUp={this.releaseNote}
            // onMouseLeave={this.releaseNote}
            // onMouseEnter={this.mouseEnter}
        ></div>
    );
  }
}

export default Key;
