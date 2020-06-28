// @flow
import * as React from 'react';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components';

import { Arc, Circle } from './svgPatterns';

import { StyledPlaySvg, StyledResetSvg, StyledPauseSvg } from './TimerSvgs';

import withThemeContext from './withThemeContext';

const Button = styled.button`
  border: none;
  background: blue;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background: yellow;
  }
`;

const ArcContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;
const TimeBoxReading = styled.div`
  &.paused {
    animation: 2s ${blink} infinite;
  }

  &.large {
    font-size: 60px;
  }

  position: absolute;
`;
const TimeBox = styled.div`
  position: relative;
  // background: palegreen;
  height: 100%;
  width: 100%;
  font-family: 'Orbitron', serif; // imported in main index.html
  font-size: 30px;
  color: ${({ elapsed }) => (elapsed ? 'red' : 'black')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
`;

const TimerStates = {
  initial: 'start',
  transition: {
    start: {
      play: 'on',
    },
    on: {
      pause: 'paused',
      finish: 'end',
    },
    paused: {
      reset: 'start',
      resume: 'on',
    },
    end: {
      restart: 'start',
    },
  },
};
type TimerStatesType = 'start' | 'on' | 'paused' | 'end';

const timerUpdateIntervalMs = 50;
// const countdownMs = 60 * 1000;
// NOTE use floor or ceiling?
const calculateSeconds = (ms) => {
  const newS = Math.ceil((ms / 1000) % 60);
  return newS < 60 ? newS : 0;
};
const calculateMinutes = (ms) => {
  const newM = Math.floor(ms / (1000 * 60));
  return Math.ceil((ms / 1000) % 60) >= 60 ? newM + 1 : newM;
};

type TimerProps = {
  countdownMs?: number,
  countDown?: boolean,
  onTimeout: () => any,
  children: React.Node,
  // ref: any,
};
let Timer = (
  {
    countdownMs = 60 * 1000,
    countDown = true,
    onTimeout,
    children,
  }: TimerProps,
  ref
) => {
  const initializeMinutes = () =>
    countDown && countdownMs ? calculateMinutes(countdownMs) : 0;
  const initializeSeconds = () =>
    countDown && countdownMs ? calculateSeconds(countdownMs) : 0;

  const [startTime, setStartTime] = React.useState(0);
  // const [targetTime, setTargetTime] = React.useState(0);
  const [timerMs, setTimerMs] = React.useState(0);
  const [seconds, setSeconds] = React.useState(initializeSeconds());
  const [minutes, setMinutes] = React.useState(initializeMinutes());

  const initializeTime = () => {
    setMinutes(initializeMinutes());
    setSeconds(initializeSeconds());
  };

  const [remainingFraction, setRemainingFraction] = React.useState(0);

  // const [pauseState, setPauseState] = React.useState(true);

  const [timerState, setTimerState] = React.useState(TimerStates.initial);

  // const [times, setTimes] = React.useState({ minutes: 0, seconds: 0 });

  const isPaused = timerState === 'paused';
  const isPlaying = timerState === 'on';

  React.useEffect(() => {
    // set time when mount
    const start = Date.now();

    setStartTime(start);
    // setTargetTime(start + countdownMs);
  }, []);

  React.useEffect(() => {
    const updateTimer = () => {
      if (isPlaying) {
        const curTime = Date.now();

        let dif = curTime - startTime + timerMs;

        // if countDown mode, subtract the elapsed time from the allowed time
        if (countDown && countdownMs) {
          dif = countdownMs - dif;
          // check if time elapsed
          if (dif < 0 && TimerStates.transition[timerState].finish) {
            // timer finished!
            // setPauseState(true);
            setTimerState(TimerStates.transition[timerState].finish);
            setSeconds(calculateSeconds(0));
            setMinutes(calculateMinutes(0));
            setRemainingFraction(0);

            // call timeout callback
            onTimeout();
            return;
          }
          // fraction for visualizing remaining time
          setRemainingFraction((1.0 * dif) / countdownMs);
        }
        setSeconds(calculateSeconds(dif));
        setMinutes(calculateMinutes(dif));
      }
    };
    // set interval
    // setStartTime(Date.now());

    const interval = setInterval(updateTimer, timerUpdateIntervalMs);

    return () => clearInterval(interval);
  }, [startTime, timerState, timerMs]);

  const startTimeFun = () => {
    // start taking time
    if (TimerStates.transition[timerState].start) {
      setStartTime(Date.now());
      // reset accumulated time
      setTimerMs(0);
      // setPauseState(false);
      setTimerState(TimerStates.transition[timerState].start);
    }
  };

  // // reset...
  // const updateTime = () => {
  //   // reset start time
  //   setStartTime(Date.now());
  //   // reset accumulated time
  //   setTimerMs(0);
  // };

  const togglePause = () => {
    // store current time elapsed if starting a pause
    if (TimerStates.transition[timerState].pause) {
      setTimerMs(timerMs + Date.now() - startTime);
      setTimerState(TimerStates.transition[timerState].pause);
    }
    // reset start time to now if resuming
    if (TimerStates.transition[timerState].resume) {
      setStartTime(Date.now());
      setTimerState(TimerStates.transition[timerState].resume);
    }
    // toggle pause state
    // setPauseState(!pauseState);
  };

  const startTimer = () => {
    if (TimerStates.transition[timerState].play) {
      setStartTime(Date.now());
      setTimerMs(0);
      setTimerState(TimerStates.transition[timerState].play);
    }
  };

  const restartTimer = () => {
    if (TimerStates.transition[timerState].restart) {
      initializeTime();

      setTimerState(TimerStates.transition[timerState].restart);
    }
  };

  const pauseTimer = () => {
    if (TimerStates.transition[timerState].pause) {
      setTimerMs(timerMs + Date.now() - startTime);
      setTimerState(TimerStates.transition[timerState].pause);
    }
  };
  const resumeTimer = () => {
    if (TimerStates.transition[timerState].resume) {
      setStartTime(Date.now());
      setTimerState(TimerStates.transition[timerState].resume);
    }
  };

  // expose methods to parent
  React.useImperativeHandle(ref, () => ({
    restartTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
  }));

  if (typeof children === 'function') {
    return (
      <div ref={ref}>
        {children({
          togglePause,
          timerState,
          // updateTime,
          remainingFraction,
          minutes,
          seconds,
          startTimer,
          restartTimer,
        })}
      </div>
    );
  }
};

const TimerViewContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TimerViewProps = {|
  togglePause: Function,
  timerState: TimerStatesType,
  remainingFraction: number,
  minutes: number,
  seconds: number,
  enablePause: boolean,
  large: boolean,
|};
const TimerView = ({
  className,
  togglePause,
  timerState,
  // updateTime,
  remainingFraction,
  minutes,
  seconds,
  enablePause = false,
  large,
}: TimerViewProps): React.Node => {
  const finished = seconds === 0 && minutes === 0 && timerState === 'end';
  const isPaused = timerState === 'paused';

  return (
    <TimerViewContainer className={classnames('Timer', className, { large })}>
      {enablePause && (
        <Button onClick={togglePause}>
          {isPaused ? (
            <StyledPlaySvg width="40" height="40" />
          ) : (
            <StyledPauseSvg width="40" height="40" />
          )}
        </Button>
      )}
      {/* {timerState} */}

      {/* <Button onClick={updateTime}>
        <StyledResetSvg width="40" height="40" />
      </Button> */}

      <TimeBox elapsed={finished} className="TimeBox">
        <ArcContainer>
          {/* <Arc width={'100%'} height={'100%'} endAngle={remainingFraction * 360} /> */}
          {remainingFraction !== 0 && (
            <Circle
              width="100%"
              height="100%"
              remainingFraction={remainingFraction}
              isPaused={isPaused}
              secondsLeft={minutes * 60 + seconds}
            />
          )}
        </ArcContainer>
        <TimeBoxReading className={classnames({ paused: isPaused, large })}>
          {`${minutes}:${`0${seconds}`.substr(-2)}`}
        </TimeBoxReading>
      </TimeBox>
    </TimerViewContainer>
  );
};

Timer = React.forwardRef(Timer);

const CompleteTimer = ({ onTimeout }: any) => (
  <Timer onTimeout={onTimeout}>{TimerView}</Timer>
);

const TimerViewThemer = styled(TimerView)`
  background: ${({ theme }) => theme.button};
`;
const ThemedTimerView = withThemeContext(TimerViewThemer);

export default CompleteTimer;
export { Timer, TimerView, ThemedTimerView };
