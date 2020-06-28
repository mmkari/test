// @flow
import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const ColorPaletteColor = styled.div`
  padding: 1em;
  // width: ${({ width }) => width}%;
  // min-width: 180px;
  background: ${({ color }) => color || 'black'};
`;

const ColorPaletteContainer = styled.div`
  display: flex;
`;

const ColorPalette = ({ colors }: { colors: Object }) => {
  //
  const { main, background, foreground, highlight, button, text } = colors;
  const colorsArray = [main, background, foreground, highlight, button, text];
  return (
    <ColorPaletteContainer>
      {colorsArray.map((color) => {
        //
        return <ColorPaletteColor color={color} />;
      })}
    </ColorPaletteContainer>
  );
};

export default ColorPalette;
