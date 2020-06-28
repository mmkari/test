// @flow
import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';
import { CSSTransition, Transition } from 'react-transition-group';
import { AgainSvg, CrossSvg, CheckSvg } from './svgs';
import withThemeContext from './withThemeContext';

const MyTransitionButton = styled.div`
  z-index: -1;
  height: 100%;
  flex-grow: 1;

  button {
    &::after {
      content: '';
      position: absolute;
      // z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 65px 10px
        ${({ type }) => (type === 'cross' ? 'orange' : 'green')};
      background: ${({ type }) => (type === 'cross' ? 'orange' : 'green')};
      opacity: 0; // change
      transition: opacity 0.6s;
    }

    transition: opacity 0.6s, background 800ms, transform 800ms;
  }

  &.dropped-card-enter {
    tranform: scale(1);

    button {
      &::after {
        opacity: 0; // change
      }
    }
  }
  &.dropped-card-enter-active {
    tranform: scale(1.4);

    button {
      &::after {
        opacity: 1; // change
      }
    }
  }
  &.dropped-card-enter-done {
    button {
      &::after {
        opacity: 1; // change
      }
    }
  }
  &.dropped-card-exit {
    button {
      &::after {
        opacity: 1; // change
      }
    }
  }
  &.dropped-card-exit-active {
    button {
      &::after {
        opacity: 0; // change
      }
    }
  }
  &.dropped-card-exit-done {
    // opacity: 0;
    button {
      &::after {
        opacity: 0; // change
      }
    }
  }
`;

const ActionButton = styled.button`
  position: relative;
  height: 100%;
  flex-grow: 1;
  box-shadow: 0 0 ${({ highLight }) => (highLight ? 10 : 0)}px
    ${({ color }) => color};
  background: ${({ highLight, color }) => (highLight ? color : 'transparent')};
  border: 2px dashed ${({ theme }) => theme.border}
  transition: background 0.4s;
`;

const ThemedActionButton = withThemeContext(ActionButton);

const ActionButtonCount = styled.span`
  position: absolute;
  // right: 0;
  top: 0;
  font-size: 45px;
  color: gray;

  ${({ type }) => (type === 'cross' ? 'left: 0' : 'right: 0')};
`;

const GameDropArea = ({ animationIn, highlight, dropCount, type }) => {
  //
  let color;
  let SvgComponent;
  if (type === 'check') {
    color = 'rgba(11, 203, 22, 0.4)';
    SvgComponent = CheckSvg;
  } else {
    color = 'rgba(203, 11, 22, 0.4)';
    SvgComponent = CrossSvg;
  }
  return (
    <CSSTransition in={animationIn} timeout={1000} classNames="dropped-card">
      <MyTransitionButton type={type}>
        <ThemedActionButton highLight={highlight} color={color}>
          <SvgComponent width="200" height="200" />
          <ActionButtonCount type={type}>{dropCount}</ActionButtonCount>
        </ThemedActionButton>
      </MyTransitionButton>
    </CSSTransition>
  );
};

export default GameDropArea;
