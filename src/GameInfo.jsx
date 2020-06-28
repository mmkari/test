import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';

const InfoContainer = styled.div`
  width: 200px;
  //   height: 400px;
  background: lightblue;
  color: purple;
`;

const GameInfo = ({ round, className }) => {
  //
  return (
    <InfoContainer>
      <h2>Info</h2>
      <ul>
        <li>{`Round: ${round}`}</li>
      </ul>
    </InfoContainer>
  );
};

export default GameInfo;
