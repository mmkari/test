// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
// import classnames from 'classnames';
// import { CSSTransition } from 'react-transition-group';

import { zoomIn } from 'react-animations';
// import Button from './Button';

const zoomInAnimation = keyframes`${zoomIn}`;
const wordInDuration = 2;
const wordInDelayUnit = 1;

const ListsContainer = styled.div`
  display: flex;
  background: lightblue;
  color: purple;
  width: 100%;
`;

const ListInstance = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;

  li {
    // opacity: 0;
    animation: ${wordInDuration}s ${zoomInAnimation};
    animation-delay: ${({ delay }) => delay * wordInDelayUnit}s;
    animation-fill-mode: forwards;
    animation-direction: normal;
  }
`;

const List = ({ words, heading }) => {
  //
  return (
    <ListInstance className="SingleWordList">
      <h3>{heading}</h3>
      <ul>
        {words.map((word) => {
          return <li>{word}</li>;
        })}
      </ul>
    </ListInstance>
  );
};

const GameScoreBoardWords = ({ children, wordsGuessed, wordsSkipped }) => {
  //

  return (
    <ListsContainer className="WordLists">
      <List words={wordsSkipped} heading="Skipped" />
      <List words={wordsGuessed} heading="Guessed" />
    </ListsContainer>
  );
};

export default GameScoreBoardWords;
