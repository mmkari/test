// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
// import classnames from 'classnames';
// import { CSSTransition } from 'react-transition-group';

// import Button from './Button';
// import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';

const InfoContainer = styled.div`
  display: flex;
  background: lightblue;
  color: purple;
  width: 100%;
`;

const InfoItemContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
`;

const InfoItem = ({ children }) => {
  //
  return (
    <InfoItemContainer className="SingleInfoField">
      {children}
    </InfoItemContainer>
  );
};

const GameScoreBoardInfo = ({ winningScore }) => {
  //

  return (
    <InfoContainer>
      <InfoItem>
        <h3>Rules</h3>
        <ul>
          <li>
            {/* <SportsBaseballIcon /> */}
            <span>{`Score to win: ${winningScore}`}</span>
          </li>
        </ul>
      </InfoItem>
    </InfoContainer>
  );
};

export default GameScoreBoardInfo;
