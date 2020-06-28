import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import withThemeContext from './withThemeContext';

const Circles = ({ cx, cy }) => {
  return (
    <>
      {[...Array(7).keys()].map((i) => {
        return (
          <circle
            key={`circle-${i}`}
            cx={cx}
            cy={cy}
            r={148 - i * 20}
            strokeWidth="4"
            stroke="cadetblue"
            fill="white"
          />
        );
      })}
    </>
  );
};

const JapWaves = ({ width = '100%', height = '100%', patternHeight = 25 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <defs>
        <pattern
          id="pattern-checkers"
          x="0"
          y="0"
          width={patternHeight * 2}
          height={patternHeight}
          viewBox="0 0 300 150"
          patternUnits="userSpaceOnUse"
        >
          <Circles cx="150" cy="0" />
          <Circles cx="0" cy="75" />
          <Circles cx="300" cy="75" />
          <Circles cx="150" cy="150" />
          <Circles cx="0" cy="225" />
          <Circles cx="300" cy="225" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#pattern-checkers)" />
    </svg>
  );
};

// returns a point (x,y) on the circumference of the circle
const polar2Cartesian = (cx, cy, r, a) => {
  // angles clockwise & starting from positive x-axis
  // convert a (deg) to radians
  const aRad = ((a - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(aRad), y: cy + r * Math.sin(aRad) };
};

const Arc = ({
  width = '100%',
  height = '100%',
  endAngle = 100,
  background = 'lightgray',
}) => {
  const strokeWidth = 50;
  const cx = 200;
  const cy = 200;
  const r = 200 - 0.5 * strokeWidth;
  const arcWidth = 40;
  const rCutoff = r - arcWidth;

  const a = 0;
  const b = endAngle;
  const largeArcFlag = b - a > 180 ? '1' : '0';

  const start = polar2Cartesian(cx, cy, r, a);
  const end = polar2Cartesian(cx, cy, r, b);
  const start2 = polar2Cartesian(cx, cy, rCutoff, a);
  const end2 = polar2Cartesian(cx, cy, rCutoff, b);

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
    'L',
    cx,
    cy,
    'Z',
  ].join(' ');

  // const d = [
  //   'M',
  //   start.x,
  //   start.y,
  //   'A',
  //   r,
  //   r,
  //   0,
  //   largeArcFlag,
  //   1,
  //   end.x,
  //   end.y,
  // ].join(' ');

  const dCutout = [
    'M',
    start2.x,
    start2.y,
    'A',
    rCutoff,
    rCutoff,
    0,
    largeArcFlag,
    1,
    end2.x,
    end2.y,
    'L',
    cx,
    cy,
    'Z',
  ].join(' ');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 400 400"
    >
      <path id="arc" stroke="none" fill="orange" d={d} strokeWidth="1" />
      <path
        id="arc-cutout"
        fill={background}
        stroke="none"
        fillRule="evenodd"
        d={dCutout}
      />
    </svg>
  );
};

// NOTE 113px is the dashoffset that reaches an entire circumference
const countdown = (remainingFraction) => keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: ${remainingFraction * 113}px;
  }
`;
const CircleContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  svg {
    // position: absolute;
    transform: rotateZ(-90deg);
  }

  svg circle {
    // transform: rotateZ(-90deg);
    stroke-dasharray: 113;
    stroke-dashoffset: 113;
    stroke-linecap: butt;
    stroke-width: 6px;
    stroke: ${({ theme }) => theme.highlight};
    fill: none;
    animation: ${({ animation }) => countdown(animation.remainingFraction)}
      ${({ animation }) => animation.secondsLeft}s linear infinite forwards;
    animation-play-state: ${({ animation }) =>
      animation.isPaused ? 'paused' : 'running'};
  }
`;

const BaseCircle = ({
  width = '100%',
  height = '100%',
  remainingFraction = 1.0,
  background = 'lightgray',
  isPaused,
  secondsLeft,
  theme,
}) => {
  //
  const [animation, setAnimation] = React.useState({});

  React.useEffect(() => {
    // set animation parameters, refresh when play state changes
    const conf = { remainingFraction, isPaused, secondsLeft };

    setAnimation(conf);
  }, [isPaused]);

  return (
    <CircleContainer theme={theme} animation={animation}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 40 40"
      >
        <circle r="18" cx="20" cy="20" />
      </svg>
    </CircleContainer>
  );
};

const Circle = withThemeContext(BaseCircle);

export default JapWaves;
export { Arc, Circle };
