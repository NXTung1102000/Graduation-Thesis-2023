import React from 'react';

interface ITimerCountdownProps {}

interface ITimerCountdownState {
  time: {
    m: number;
    s: number;
  };
  seconds: number;
}

class TimerCountdown extends React.Component<ITimerCountdownProps, ITimerCountdownState> {
  private timer: number;
  public constructor(props: ITimerCountdownProps) {
    super(props);
    this.state = { time: { m: 0, s: 0 }, seconds: 120 };
    this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  private secondsToTime(secs: number) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = window.setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  // startTimer() {
  //   if (this.timer == 0 && this.state.seconds > 0) {
  //     this.timer = window.setInterval(this.countDown, 1000);
  //   }
  // }

  render() {
    return (
      <div>
        {/* <button onClick={this.startTimer}>Start</button> */}
        {this.state.time.m} : {this.state.time.s}
      </div>
    );
  }
}

export default TimerCountdown;
