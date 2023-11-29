import { Component } from 'react';
import click1 from './assets/click1.mp3';
import click2 from './assets/click2.mp3';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatsPerMeasure: 4,
    };
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    this.setState({ bpm });
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true,
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  };

  // eslint-disable-next-line no-dupe-class-members
  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className='container'>
        <div className='metronome'>
          <div className='slider-container'>
            <div>{bpm} BPM</div>
            <input className='slider' type='range' min='60' max='240' value={bpm} onChange={this.handleBpmChange} />
          </div>
          <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
        </div>
      </div>
    );
  }
}
export default Metronome;
