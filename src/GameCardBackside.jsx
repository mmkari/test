// @flow
import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';

import JapWaves from './svgPatterns';

const CardBackside = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 5px;
  overflow: hidden;
  background: yellow;
  position: relative;
  border: 1px solid gray;
`;

type Props = {|
  width: number,
  height: number,
|};
const GameCardBackside = ({ width, height }: Props) => {
  //
  return (
    <CardBackside width={width} height={height} className="CardBackside">
      <JapWaves patternHeight={50} border />
    </CardBackside>
  );
};

export default GameCardBackside;
