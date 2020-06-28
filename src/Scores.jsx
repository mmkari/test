import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { zoomIn } from 'react-animations';
import { CSSTransition } from 'react-transition-group';
import StyledGameBoard from './GameBoardSvg';

const zoomInAnimation = keyframes`${zoomIn}`;

const scoreInDuration = 2;
const scoreInDelayUnit = 1;
const resultDuration = 3;

const ScoresTeamName = styled.span`
  height: 25px;
  color: orange;
  margin: 0 4px;
`;
const ScoresScore = styled.span`
  color: blue;
  margin: 0 4px;
`;
const AddedPoints = styled.span`
  color: orange;
  margin: 0 4px;
  opacity: 0;
  animation: ${scoreInDuration}s ${zoomInAnimation};
  animation-delay: ${({ delay }) => delay * scoreInDelayUnit}s;
  animation-fill-mode: forwards;
  animation-direction: normal;

  background: palegoldenrod;
  border-radius: 10px;
  min-width: 2em;
`;

const ScoreContainer = styled.div`
  width: 100%;
  //   height: 400px;
  background: lightblue;
  color: purple;

  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ScoreAnimation = styled.div`
  color: blue;
  margin: 0 4px;
  height: 25px;
  overflow: hidden;
  position: relative;

  text-align: left;

  &.score-enter {
    .parts {
      transform: translateY(0%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
    .result {
      transform: translateY(0%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
  }
  &.score-enter-active {
    .parts {
      transform: translateY(-100%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
    .result {
      transform: translateY(-100%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
  }
  &.score-enter-done {
    .parts {
      transform: translateY(-100%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
    .result {
      transform: translateY(-100%);
      transition: transform ${resultDuration}s;
      transition-delay: ${({ index }) =>
        scoreInDuration + (index + 1) * scoreInDelayUnit}s;
    }
  }
`;
const ScoreResult = styled.div`
  color: brown;
  margin: 0 4px;
`;

// Animation steps:
// 1. show added points in sequence (max 2)
// 2. move bob of team whose turn
// 3. move bob of team that stole last point

const Scores = ({
  teams,
  scores,
  className,
  teamTurn,
  showBoard,
  wordsGuessed,
  entered,
  isActive,
  dimension,
  moveAnimationComponents,
  noSound,
}) => {
  //
  return (
    <ScoreContainer className="Scores">
      <h2>Scores</h2>
      <ul>
        {scores.map((score, index) => {
          const newPoints = wordsGuessed
            ? wordsGuessed.filter((w) => w.teamIndex === index).length
            : 0;

          return (
            <li>
              {teamTurn === index && <LabelImportantIcon />}
              <ScoresTeamName>{teams[index]}</ScoresTeamName>
              <CSSTransition
                in={entered && isActive}
                timeout={0}
                classNames="score"
                unmountOnExit
                mountOnEnter
              >
                <ScoreAnimation index={index}>
                  <div className="parts">
                    <ScoresScore>{score}</ScoresScore>
                    {newPoints > 0 && (
                      <AddedPoints delay={index}>
                        {`+ ${newPoints}`}
                      </AddedPoints>
                    )}
                  </div>
                  <ScoreResult className="result" delay={index}>
                    {score + newPoints}
                  </ScoreResult>
                </ScoreAnimation>
              </CSSTransition>
            </li>
          );
        })}
      </ul>

      {showBoard && (
        <StyledGameBoard
          wordsGuessed={wordsGuessed}
          numTeams={scores.length}
          scores={scores}
          width={dimension.width}
          moveAnimationComponents={moveAnimationComponents}
          noSound={noSound}
        />
      )}
    </ScoreContainer>
  );
};

export default Scores;
