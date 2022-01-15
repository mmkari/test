import * as React from 'react';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components';

import Draggable from 'react-draggable';
import { fadeInDown } from 'react-animations';
import GameCardBackside from './GameCardBackside';
import GameDroppedCard from './GameDroppedCard';
import GameCard from './GameCard';
import Card from './Card';

const StartCardButton = styled.button`
  font-size: 34px;

  position: absolute;
  height: 100%;
  width: 100%;
  // height: 40px;
  padding: 40% 0;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  transition: padding 0.3s;
  :hover {
    padding: 0 0;
    transition: padding 0.3s;
    background: rgba(0, 180, 0, 0.2);
    background-clip: content-box;
    cursor: pointer;
  }
  background-clip: content-box;
  background-repeat: no-repeat;
`;

const fadeInDownAnimation = keyframes`${fadeInDown}`;

const CardContainer = styled.div`
  animation: 1s ${fadeInDownAnimation};
  &.canDrag {
    cursor: grab;
  }
  &.dragging {
    cursor: grabbing;
  }

  position: relative;
  display: flex;
  // justify-content: center;
  // align-items: center;
  .Card {
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  &.cardTurned {
    .FlipContainer {
      transform: rotateY(-180deg);
      transition: transform 0.4s;
    }
  }
  box-shadow: 12px 5px 2px 5px rgba(0, 0, 0, 0.2); // shadow outside
  // background: rgba(0, 0, 0, 0.2); // shadow inside
  background: linear-gradient(
    to right,
    transparent 5px,
    rgba(0, 0, 0, 0.2) 8px
  );
  background-position: right 25px;
`;

const FlipContainer = styled.div`
  position: relative;
  // width: 100%;
  // height: 100%;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  // transition: transform 0.4s;
  transform-style: preserve-3d;

  .CardBackside,
  .Card {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  .Card {
    transform: rotateY(-180deg);
  }
`;
const GameCardCompsContainer = styled.div.attrs({ className: 'GameCardComps' })`
  .Card {
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
`;

const GameCardComps = ({
  currentPosition,
  onDrag,
  onStopDrag,
  timerState,
  dropAnimation,
  dropPosition,
  cardHeight,
  droppedWord,
  cardWidth,
  word,
  startRound,
}) => {
  //

  let fontSize = 34;
  if (word.length >= 12) {
    fontSize = 30;
  } else if (word.length >= 16) {
    fontSize = 26;
  }

  return (
    <GameCardCompsContainer>
      <GameDroppedCard
        dropAnimation={dropAnimation}
        dropPosition={dropPosition}
        cardHeight={cardHeight}
        word={droppedWord}
      />

      <Draggable
        position={currentPosition}
        onDrag={onDrag}
        onStop={onStopDrag}
        disabled={timerState !== 'on'}
      >
        <CardContainer
          offsetX={currentPosition.x}
          className={classnames('CardContainer', {
            cardTurned: timerState !== 'start',
            dragging: currentPosition.x !== 0,
            canDrag: timerState === 'on',
          })}
        >
          <FlipContainer
            className="FlipContainer"
            width={cardWidth}
            height={cardHeight}
          >
            <GameCardBackside width={cardWidth} height={cardHeight} />
            <Card height={cardHeight} lang="fi" fontSize={fontSize}>
              {word}
            </Card>
            <GameCard
              dropAnimation={dropAnimation}
              cardHeight={cardHeight}
              word={word}
              fontSize={fontSize}
            />
          </FlipContainer>
          {timerState === 'start' && (
            <StartCardButton onClick={startRound}>Start!</StartCardButton>
          )}
        </CardContainer>
      </Draggable>
    </GameCardCompsContainer>
  );
};

export default GameCardComps;
