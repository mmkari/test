// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
// import classnames from 'classnames';
// import { CSSTransition } from 'react-transition-group';
import { Swipeable } from 'react-swipeable';
import Tabs from './Tabs';
import useContainerDimensions from './hooks';

const Tab = styled.button`
  flex-grow: 1;
  &.active {
    background: green;
  }
  :hover {
    background: lightgreen;
  }
  height: 50px;
`;

const SwipeableTabsContainer = styled.div`
  display: flex;
`;

const TabContent = styled.div`
  background: pink;

  &.active {
    background: orange;
  }
  display: flex;
  width: 100%;
`;

const SwipeableContent = styled.div`
  display: flex;
  width: ${({ numPages }) => numPages * 100}%;

  transform: translateX(${({ offset }) => offset}px);
  transition: transform ${({ letgo }) => (letgo ? 1 : 0)}s;

  //   .SwipeableContainer {
  //     width: 100%;
  //   }
`;

type SwipeableTabsProps = {|
  keys: Array<string>,
  tabs: Array<string>,
  onChange?: Function,
  contents: Function | Array<React.Node>,
  children?: Function,
|};
const SwipeableTabs = ({
  keys,
  tabs,
  onChange,
  contents,
  children,
}: SwipeableTabsProps) => {
  //
  const [ref, dimension] = useContainerDimensions();
  const [offset, setOffset] = React.useState(0);

  const onTabChange = (newInd) => {
    if (dimension) {
      setOffset(-1 * newInd * dimension.width);
    }
  };

  // contents can be a function or an array. In case of array, render all but hide non-active tab content
  return (
    <Tabs tabs={tabs} keys={keys} onChange={onTabChange} getRef={ref}>
      {({ key, index, content, changeTab, count }) => (
        <Swipeable
          className="SwipeableContainer"
          onSwiped={(eventData) => {
            const validSwipe = eventData.absX > 150 || eventData.velocity > 1;

            let newIndex = index;
            if (eventData.dir === 'Right' && index > 0 && validSwipe) {
              //
              newIndex = Math.max(index - 1, 0);
              changeTab(newIndex);
            } else if (
              eventData.dir === 'Left' &&
              index < children.length - 1 &&
              validSwipe
            ) {
              //
              newIndex = Math.min(index + 1, count - 1);
              changeTab(newIndex);
            }
            // in any case, reset the offset
            if (dimension) {
              setOffset(-1 * newIndex * dimension.width);
            }
          }}
          onSwiping={(eventData) => {
            //

            // NOTE sign bug in eventData x amount
            if (dimension) {
              setOffset(-1 * index * dimension.width - eventData.deltaX);
            }
          }}
        >
          <SwipeableContent
            numPages={children.length}
            offset={offset}
            letgo={dimension && offset % dimension.width === 0}
          >
            {children.map((child, childIndex) => (
              <TabContent>
                {React.cloneElement(child, {
                  isActive: index === childIndex,
                  dimension,
                })}
              </TabContent>
            ))}
          </SwipeableContent>
        </Swipeable>
      )}
    </Tabs>
  );
};

//   {gameState === 'gameOver' ? (
//     <h1>GAME OVER!</h1>
//   ) : (
//     <h2>{`Round ${round}`}</h2>
//   )}

export default SwipeableTabs;
