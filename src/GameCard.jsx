// @flow
import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Card from './Card';

const MyTransition = styled.div`
  .Card {
    background: ${({ cardColor }) => cardColor};
    transform: scale(1);
  }

  &.new-card-enter {
    opacity: 0;
  }
  &.new-card-enter-active {
    opacity: 1;
    transition: opacity 1s;
    background: orange;
  }
  // &.new-card-enter-done {
  //   // color: purple;
  // }
  //   &.new-card-exit {
  //     opacity: 1;
  //     .Card {
  //       transform: scale(1);
  //     }
  //   }
  //   &.new-card-exit-active {
  //     opacity: 0;
  //     .Card {
  //       transform: scale(0.4);
  //       transition: opacity 800ms, transform 800ms;
  //     }
  //     transition: opacity 800ms, transform 800ms;
  //   }
  //   &.new-card-exit-done {
  //     opacity: 0;
  //     .Card {
  //       transform: scale(0.4);
  //     }
  //   }
`;

const GameCardContainer = styled.div`
  z-index: 2;
  .Card {
    user-select: none;
    // box-shadow: 0 0 ${({ offsetX }) => Math.abs(offsetX) / 10.0}px
    //   rgba(81, 203, 238, 1);
    font-size: ${({ fontSize }) => fontSize}px;
  }
    // &::after {

    //     position: absolute;
    //     content: '';
    //     height: 100%;
    //     width: 100%;
    //     top: 0;
    //     left: 0;
    //     z-index: -1;
    //     background: purple;

    //     box-shadow: 10px 10px 10px green;
    // }
`;

const GameCard = ({ dropAnimation, cardHeight, word }) => {
  //
  let fontSize = 34;
  if (word.length >= 12) {
    fontSize = 30;
  } else if (word.length >= 16) {
    fontSize = 26;
  }
  return (
    <CSSTransition in={dropAnimation} timeout={1000} classNames="new-card">
      <MyTransition id="33" className="GameCard">
        <GameCardContainer className="CardContainer" fontSize={fontSize}>
          <Card height={cardHeight}>{word}</Card>
        </GameCardContainer>
      </MyTransition>
    </CSSTransition>
  );
};

export default GameCard;
