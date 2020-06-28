// @flow
import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Motion, spring } from 'react-motion';

const BlurArea = styled.div`
  padding: 1em;
  background: lightgreen;
  opacity: 0.1;
  flex-grow: 1;
`;

const SwipeMenuContainerContent = styled.div`
  padding: 1em;
  width: ${({ width }) => width}%;
  min-width: 180px;
  background: orange;
  border-right: ${({ rightSide }) => (!rightSide ? '1px solid gray' : 'none')};
  border-left: ${({ rightSide }) => (rightSide ? '1px solid gray' : 'none')};
`;

const SwipeMenuContainer = styled.div`
  width: ${({ style }) => style.x}%;
  height: 100%;
  background: transparent;
  color: purple;
  //   padding: 1em;
  position: absolute;
  right: ${({ rightSide }) => (rightSide ? 0 : 'unset')};
  top: 0;
  overflow: hidden;
  display: flex;
`;

const SwipeMenu = ({
  open,
  rightSide,
  width = 30, // %
  children,
  closeMenu,
}: {
  open: boolean,
  rightSide?: boolean,
  width: number,
  children: React.Node,
}) => {
  //
  return (
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(open ? 100 : 0) }}>
      {(interpolatingStyle) => (
        <SwipeMenuContainer style={interpolatingStyle} rightSide={rightSide}>
          <BlurArea onClick={closeMenu} />
          <SwipeMenuContainerContent width={width}>
            {children}
          </SwipeMenuContainerContent>
        </SwipeMenuContainer>
      )}
    </Motion>
  );
};

export default SwipeMenu;
