import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import FlipNumber from './flip-number';
import Separator from './flip-number/separator';

import TransformUtils from '../utils';

import style from './style';

class Timer extends React.Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  componentDidMount() {
    const { time } = this.props;
    const { hours, minutes, seconds } = TransformUtils.formatNumberToTime(time);
    this.setState({
      hours,
      minutes,
      seconds,
    });
    this.timer = setInterval(
      () => this.updateTime(),
      1000,
    );
  }

  shouldComponentUpdate(nextProps) {
    const { play } = this.props;
    if (nextProps.play !== play) {
      if (nextProps.play) {
        this.timer = setInterval(
          () => this.updateTime(),
          1000,
        );
      } else {
        clearInterval(this.timer);
      }
    }
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime = () => {
    const { hours, minutes, seconds } = this.state;
    const newState = TransformUtils.addTime(hours, minutes, seconds);
    this.setState(prevState => ({ ...prevState, ...newState }));
  }

  render() {
    const { wrapperStyle } = this.props;
    const { hours, minutes, seconds } = this.state;
    return (
      <View style={[style.wrapper, wrapperStyle]}>
        {!!hours && <FlipNumber number={hours} unit="hours" />}
        <Separator />
        {!!minutes && <FlipNumber number={minutes} unit="minutes" />}
        <Separator />
        {!!seconds && <FlipNumber number={seconds} unit="seconds" />}
      </View>
    );
  }
}

Timer.defaultProps = {
  play: true,
  wrapperStyle: {},
};

Timer.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  play: PropTypes.bool,
  wrapperStyle: PropTypes.object,
};

export default Timer;
