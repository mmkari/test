import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import Button from './Button';

const TeamButton = styled(Button)`
  background: orange;
  width: 100px;
  height: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TeamButtons = ({ className, teams, onClick }) => {
  return (
    <div className={classnames('TeamButtons', className)}>
      {teams &&
        teams.map((team, index) => {
          //
          return <TeamButton onClick={() => onClick(index)}>{team}</TeamButton>;
        })}
    </div>
  );
};

export default TeamButtons;
