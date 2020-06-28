// @flow
import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Card from './Card';

const MyTransition = styled.div`
  &.dropped-card-exit {
    opacity: 1;
    .Card {
      transform: scale(1);
    }
  }
  &.dropped-card-exit-active {
    opacity: 0;
    .Card {
      transform: scale(0.4);
      background: ${({ cardColor }) => cardColor};
      transition: opacity 800ms, transform 800ms, background 800ms;
    }
    transition: opacity 800ms, transform 800ms, background 800ms;
  }
  &.dropped-card-exit-done {
    opacity: 0;
    .Card {
      background: ${({ cardColor }) => cardColor};
      transform: scale(0.4);
    }
  }
`;

const DroppedCardContainer = styled.div`
  .Card {
    user-select: none;
    // box-shadow: 0 0 ${({ offsetX }) => Math.abs(offsetX) / 10.0}px
    //   rgba(81, 203, 238, 1);
    font-size: ${({ fontSize }) => fontSize}px;
  }

  position: absolute;
  transform: translate(
    ${({ position }) => (position ? position.x : 0)}px,
    ${({ position }) => (position ? position.y : 0)}px
  );
`;

const GameDroppedCard = ({ dropAnimation, dropPosition, cardHeight, word }) => {
  //
  if (typeof dropPosition.x !== 'number') {
    return null;
  }
  return (
    <CSSTransition
      in={dropAnimation}
      timeout={1000}
      classNames="dropped-card"
      type="cross"
    >
      <MyTransition
        id="11"
        className="something"
        cardColor={dropPosition.x > 0 ? 'green' : 'red'}
      >
        <DroppedCardContainer
          className="CardContainer"
          position={dropPosition}
          fontSize={word && word.length >= 12 ? 20 : 34}
        >
          <Card height={cardHeight}>{word}</Card>
        </DroppedCardContainer>
      </MyTransition>
    </CSSTransition>
  );
};

export default GameDroppedCard;
