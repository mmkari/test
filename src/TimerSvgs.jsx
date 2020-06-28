// @flow
import * as React from 'react';
import styled from 'styled-components';

type SvgIconProps = { className: string, width: number, height: number };

const PlaySvg = ({ className, width = 34, height = 34 }: SvgIconProps) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 30 30"
      >
        <path
          d="M 29.668148,14.952721 0.16887829,29.7025 V 0.20294159 Z"
          stroke="#990000"
          fill="#990000"
        />
      </svg>
    </div>
  );
};
const StyledPlaySvg = styled(PlaySvg)`
  display: flex;
`;

const ResetSvg = ({ className, width = 34, height = 34 }: SvgIconProps) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 30 30"
      >
        <path
          d="M 0.09565358,0.09566134 29.904361,29.904346"
          stroke="#990000"
          fill="#990000"
        />
        <path
          d="M 0.09495342,29.902577 29.905048,0.09743278"
          stroke="#990000"
          fill="#990000"
        />
      </svg>
    </div>
  );
};
const StyledResetSvg = styled(ResetSvg)`
  display: flex;
`;

const PauseSvg = ({ className, width = 34, height = 34 }: SvgIconProps) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 30 30"
      >
        <path
          d="M 0.20063258,0.1751504 V 29.96473 H 9.2487737 V 0.1751504 Z"
          stroke="#990000"
          fill="#990000"
        />
        <path
          d="M 20.894829,0.1751504 V 29.96473 h 9.04814 V 0.1751504 Z"
          stroke="#990000"
          fill="#990000"
        />
      </svg>
    </div>
  );
};
const StyledPauseSvg = styled(PauseSvg)`
  display: flex;
`;

export { StyledPlaySvg, StyledResetSvg, StyledPauseSvg };
