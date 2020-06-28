// @flow
import * as React from 'react';
// import styled from 'styled-components';

// import { ThemedButton as Button } from './Button';
import withSoundContext from './withSoundContext';

type SvgIconProps = { className: string, width: number, height: number };

const blocks = [
  { x: 0, y: 0, type: 'checker' },
  { x: 1, y: 0, type: 'empty' },
  { x: 2, y: 0, type: 'empty' },
  { x: 3, y: 0, type: 'empty' },
  { x: 4, y: 0, type: 'empty' },
  { x: 5, y: 0, type: 'empty' },
  { x: 6, y: 0, type: 'empty' },
  { x: 7, y: 0, type: 'empty' },
  { x: 8, y: 0, type: 'empty' },
  { x: 9, y: 0, type: 'empty' },
  { x: 10, y: 0, type: 'empty' },
  { x: 11, y: 0, type: 'empty' },
  { x: 12, y: 0, type: 'empty' },
  { x: 13, y: 0, type: 'empty', turn: 'D' },
  // down
  { x: 13, y: 1, type: 'empty' },
  { x: 13, y: 2, type: 'empty' },
  { x: 13, y: 3, type: 'empty', turn: 'L' },
  // left
  { x: 12, y: 3, type: 'empty' },
  { x: 11, y: 3, type: 'empty' },
  { x: 10, y: 3, type: 'empty' },
  { x: 9, y: 3, type: 'empty' },
  { x: 8, y: 3, type: 'empty' },
  { x: 7, y: 3, type: 'empty' },
  { x: 6, y: 3, type: 'empty' },
  { x: 5, y: 3, type: 'empty' },
  { x: 4, y: 3, type: 'empty' },
  { x: 3, y: 3, type: 'empty', turn: 'D' },
  // down
  { x: 3, y: 4, type: 'empty' },
  { x: 3, y: 5, type: 'empty' },
  { x: 3, y: 6, type: 'empty' },
  { x: 3, y: 7, type: 'empty', turn: 'R' },
  // right
  { x: 4, y: 7, type: 'empty' },
  { x: 5, y: 7, type: 'empty' },
  { x: 6, y: 7, type: 'empty' },
  { x: 7, y: 7, type: 'empty' },
  { x: 8, y: 7, type: 'empty' },
  { x: 9, y: 7, type: 'empty' },
  { x: 10, y: 7, type: 'empty' },
  { x: 11, y: 7, type: 'empty' },
  { x: 12, y: 7, type: 'empty' },
  { x: 13, y: 7, type: 'empty', turn: 'D' },
  // down
  { x: 13, y: 8, type: 'empty' },
  { x: 13, y: 9, type: 'empty' },
  { x: 13, y: 10, type: 'empty', turn: 'L' },
  // left
  { x: 12, y: 10, type: 'empty' },
  { x: 11, y: 10, type: 'empty' },
  { x: 10, y: 10, type: 'empty' },
  { x: 9, y: 10, type: 'empty' },
  { x: 8, y: 10, type: 'empty' },
  { x: 7, y: 10, type: 'empty' },
  { x: 6, y: 10, type: 'empty' },
  { x: 5, y: 10, type: 'empty' },
  { x: 4, y: 10, type: 'empty' },
  { x: 3, y: 10, type: 'empty' },
  { x: 2, y: 10, type: 'empty' },
  { x: 1, y: 10, type: 'empty' },
  { x: 0, y: 10, type: 'empty', turn: 'U' },
  // up
  { x: 0, y: 9, type: 'empty' },
  { x: 0, y: 8, type: 'empty' },
  { x: 0, y: 7, type: 'empty' },
  { x: 0, y: 6, type: 'empty' },
  { x: 0, y: 5, type: 'empty' },
  { x: 0, y: 4, type: 'empty' },
  { x: 0, y: 3, type: 'empty' },
  { x: 0, y: 2, type: 'empty' },
  { x: 0, y: 1, type: 'empty' },
];

const jumpOnEachBlock = true;

const getBobMovePath = (startIndex, endIndex) => {
  //
  const path = [];
  if (startIndex !== endIndex) {
    path.push(blocks[startIndex]); // add start position
    let i = startIndex + 1;
    let currentBlock;
    for (i; i <= endIndex; i += 1) {
      //
      currentBlock = blocks[i];
      if (
        jumpOnEachBlock ||
        i === endIndex ||
        currentBlock.turn !== undefined
      ) {
        // this is a step in the path
        path.push(currentBlock);
      }
    }
  } else {
    // path.push(blocks[startIndex]);
    // path.push(blocks[endIndex]);
  }
  return path;
};

const bobColors = ['red', 'white', 'blue', 'yellow'];
const bobBlockIndex1 = [4, 12, 19, 34];
const bobBlockIndex2 = [55, 12, 19, 34];

const squareDimension = 42;
const checkerDimension = 21;
const bobRadius = 20;
const getBlockPosition = (index) => 5 + index * squareDimension;
const getBobPosition = (index) => getBlockPosition(index) + bobRadius;

const getMoveAnimationComponents = (p, startFactor, endFactor) => {
  if (!p) return null;

  const xVals = [];
  const yVals = [];
  const times = [];
  const rTimes = [];
  const rVals = [];
  const timeIncr = 1.0 / (p.length - 1);
  p.forEach((item, index) => {
    xVals.push(getBobPosition(item.x));
    yVals.push(getBobPosition(item.y));
    times.push(0 + index * timeIncr);
    if (index !== 0) {
      rTimes.push(0 + (index - 0.5) * timeIncr);
      rVals.push(bobRadius * 1.2);
    }
    rTimes.push(0 + index * timeIncr);
    if (index === 0) {
      rVals.push(bobRadius * startFactor);
    } else if (index === p.length - 1) {
      rVals.push(bobRadius * endFactor);
    } else {
      rVals.push(bobRadius);
    }
  });
  // after setting the move animation (should start immediately), set the move sounds

  const res = {
    still: p.length === 0, // no movement
    xVals: xVals.join(' ; '),
    yVals: yVals.join(' ; '),
    times: times.join(' ; '),
    rVals: rVals.join(' ; '),
    rTimes: rTimes.join(' ; '),
    soundTimes: times,
    startFactor,
    endFactor,
  };
  return res;
};

const playThumpSounds = (soundObject, delay, timeFractions, duration) => {
  //
  if (soundObject) {
    for (let i = 0; i < timeFractions.length; i += 1) {
      soundObject.play(delay + timeFractions[i] * duration);
    }
  }
};

const MovingCircle = ({
  moveAnimationComponents,
  delay,
  bobIndex,
  cxInitial,
  cyInitial,
  soundObject,
}) => {
  //
  const commonAnimateProps = {
    begin: `${delay}s`,
    dur: '4s',
    repeatCount: '1',
    fill: 'freeze',
  };

  // const blockInd = bobBlockIndex[bobIndex];
  // const block = blocks[blockInd];
  // const blockX = getBobPosition(block.x);
  // const blockY = getBobPosition(block.y);

  React.useEffect(() => {
    playThumpSounds(soundObject, delay, moveAnimationComponents.soundTimes, 4);
  }, [moveAnimationComponents.soundTimes]);

  return (
    <circle
      r={bobRadius * moveAnimationComponents.startFactor}
      cx={cxInitial}
      cy={cyInitial}
      fill={bobColors[bobIndex]}
    >
      {/* <animate attributeName="r" dur="4s" calcMode="spline" repeatCount="1" fill="freeze"
          values="25 ; 45 ; 30 ; 10 ; 25" keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1"
          keySplines="0.5 0 0.5 1 ; 0.5 0 0.5 1 ; 0.5 0 0.5 1 ; 0.5 0 0.5 1"/> */}
      {/* <animate attributeName="cx" dur="2s" repeatCount="1" fill="freeze"
          values={moveAnimationComponents.xVals} keyTimes={moveAnimationComponents.times}
          /> */}
      {moveAnimationComponents && !moveAnimationComponents.still && (
        // <animate attributeName="cy" dur="2s" repeatCount="1" fill="freeze"
        // values={moveAnimationComponents.yVals} keyTimes={moveAnimationComponents.times}/>

        <animate
          {...commonAnimateProps}
          attributeName="r"
          values={moveAnimationComponents.rVals}
          keyTimes={moveAnimationComponents.rTimes}
          begin={`${delay}s`}
        />
      )}
      {moveAnimationComponents && moveAnimationComponents.still && (
        <animate
          {...commonAnimateProps}
          attributeName="r"
          values={[
            bobRadius * moveAnimationComponents.startFactor,
            bobRadius * moveAnimationComponents.endFactor,
          ].join(' ; ')}
          keyTimes={[0, 1].join(' ; ')}
          begin={`${delay}s`}
        />
      )}

      {moveAnimationComponents && (
        <animate
          {...commonAnimateProps}
          attributeName="cy"
          values={moveAnimationComponents.yVals}
          keyTimes={moveAnimationComponents.times}
        />
      )}

      {moveAnimationComponents && (
        <animate
          {...commonAnimateProps}
          attributeName="cx"
          values={moveAnimationComponents.xVals}
          keyTimes={moveAnimationComponents.times}
        />
      )}
    </circle>
  );
};

const getNewScores = (wordsGuessed, numTeams, scores) => {
  const newScores = [];
  for (let i = 0; i < numTeams; i += 1) {
    const newPoints = wordsGuessed.filter((w) => w.teamIndex === i).length;
    const newScore = scores[i] + newPoints;
    newScores.push(newScore);
  }
  return newScores;
};

// if two bobs collide, later indices shrink
const getRadiusValues = (scores) => {
  const collisions = {};
  const radiusFactors = [];
  const reduction = 0.2;
  let currentScore;
  for (let i = 0; i < scores.length; i += 1) {
    currentScore = scores[i];
    let radiusFactor = 1;
    if (typeof collisions[currentScore] === 'number') {
      // score already taken
      radiusFactor = 1 - collisions[currentScore] * reduction;
    }
    radiusFactors[i] = radiusFactor;
    collisions[currentScore] = (collisions[currentScore] || 0) + 1;
  }
  return radiusFactors;
};

const getMoveAnimations = (wordsGuessed, scores, type = 'initial') => {
  //
  const numTeams = scores.length;

  const newSs = getNewScores(wordsGuessed, numTeams, scores);

  const startR = getRadiusValues(scores);
  const endR = getRadiusValues(newSs);

  const ans = [];
  for (let i = 0; i < numTeams; i += 1) {
    const newScore = newSs[i];
    const p = getBobMovePath(scores[i], newScore);
    // check collision
    ans.push(getMoveAnimationComponents(p, startR[i], endR[i]));
  }
  return ans;
};

const GameBoard = ({
  className,
  width,
  // height = 475,
  wordsGuessed,
  numTeams,
  scores,
  sounds,
  moveAnimationComponents,
}: SvgIconProps) => {
  // const initializeAnimation = () => {
  //   return getMoveAnimations( wordsGuessed, scores);
  // };

  const [bobBlockIndex, setBobIndex] = React.useState(bobBlockIndex1);
  // const [moveAnimationComponents, setMoveAnimationComponents] = React.useState(
  //   initializeAnimation
  // );

  const height = (width * 475.0) / 600;

  // determine each bob's path...
  // wordsGuessed

  // const toggleBobIndex = () => {
  //   document.getElementById('canvas').setCurrentTime(0);
  // };

  // React.useEffect(() => {
  //   setMoveAnimationComponents(
  //     getMoveAnimations(wordsGuessed, scores, 'change')
  //   );
  // }, [wordsGuessed]);

  return (
    <div className={className}>
      {/* <Button style={{ width: '100%' }} onClick={() => toggleBobIndex()}>
        Toggle position
      </Button> */}
      <svg
        id="canvas"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={undefined}
        viewBox="0 0 600 475"
      >
        <pattern
          id="pattern-checkers"
          x="0"
          y="0"
          width={checkerDimension}
          height={checkerDimension}
          patternUnits="userSpaceOnUse"
        >
          <rect
            className="checker"
            x="0"
            width={checkerDimension / 2}
            height={checkerDimension / 2}
            y="0"
          />
          <rect
            className="checker"
            x={checkerDimension / 2}
            width={checkerDimension / 2}
            height={checkerDimension / 2}
            y={checkerDimension / 2}
          />
          {/* <animate
            attributeName="x"
            values="0%;25%"
            dur="2s"
            repeatCount="indefinite"
          /> */}
        </pattern>

        <rect width="100%" height="100%" fill="lightgreen" />

        {blocks.map((block) => {
          //
          let fill = 'green';
          if (block.type === 'checker') {
            fill = 'url(#pattern-checkers)';
          }
          return (
            <rect
              width={squareDimension}
              height={squareDimension}
              x={getBlockPosition(block.x)}
              y={getBlockPosition(block.y)}
              fill={fill}
            />
          );
        })}

        {[...Array(numTeams).keys()].map((bobIndex) => {
          //
          const blockInd = scores[bobIndex];
          const block = blocks[blockInd];
          const blockX = getBobPosition(block.x);
          const blockY = getBobPosition(block.y);
          return (
            <MovingCircle
              moveAnimationComponents={moveAnimationComponents[bobIndex]}
              delay={bobIndex + 2}
              bobIndex={bobIndex}
              cxInitial={blockX}
              cyInitial={blockY}
              soundObject={sounds ? sounds.thumpSound : null}
            />
          );
        })}
      </svg>
    </div>
  );
};
const BoardWithSound = withSoundContext(GameBoard);

const BoardSwitch = (props) => {
  const { noSound, ...rest } = props;
  if (!noSound) {
    return <BoardWithSound {...rest} />;
  }
  return <GameBoard {...rest} />;
};

export default BoardSwitch;
export { getMoveAnimations };
