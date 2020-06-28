// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { fadeInDown, fadeOutDown } from 'react-animations';
import withThemeContext from './withThemeContext';
// import Button from './Button';
import { ThemedButton as Button } from './Button';

// const fadeInDownAnimation = keyframes`${fadeInDown}`;
// const fadeOutDownAnimation = keyframes`${fadeOutDown}`;

const boardAnimationDuration = 2000; // ms

const MyTransition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;

  background: ${({ theme }) => theme.foreground};

  position: absolute;
  top: -1000%;
  // transform: translateY(-1000%);
  width: 100%;
  // height: 100%;
  min-height: 280px;
  border: 1px solid gray;
  border-radius: 5px;

  &.score-board-enter {
    top: -1000%;
    // transform: translateY(-1000%);
  }
  &.score-board-enter-active {
    top: 10%;
    // transform: translateY(10%);

    transition: top ${boardAnimationDuration}ms;
  }
  &.score-board-enter-done {
    top: 10%;
    // transform: translateY(10%);
  }
  // &.score-board-exit {
  //   opacity: 1;
  // }
  //   &.score-board-exit-active {
  //     opacity: 0;
  //     transition: opacity 800ms, transform 800ms;
  //   }
  //   &.score-board-exit-done {
  //     opacity: 0;
  //   }
`;

const MyTransitionThemed = withThemeContext(MyTransition);

const Board = styled.div`
  // width: 80%;
  // height: 400px;
  //   position: absolute;
  flex-grow: 1;
`;

const CloseButton = styled(Button)`
  width: 25%;
  min-width: 150px;
  height: 50px;

  align-self: center;
`;

const GameScoreBoard = ({
  children,
  boardAnimation,
  handleAccept,
  buttonTitle,
  onEntered,
  onExited,
}) => {
  //
  return (
    <CSSTransition
      in={boardAnimation}
      timeout={boardAnimationDuration}
      classNames="score-board"
      unmountOnExit
      mountOnEnter
      onEntered={onEntered}
      onExited={onExited}
    >
      <MyTransitionThemed id="133" className="something">
        <Board className="Board">{children}</Board>
        <CloseButton onClick={handleAccept}>{buttonTitle}</CloseButton>
      </MyTransitionThemed>
    </CSSTransition>
  );
};

export default GameScoreBoard;
