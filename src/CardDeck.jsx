import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

const CardDeck = ({ className, children }) => {
  return <div className={classnames('CardDeck', className)}>{children}</div>;
};

const StyledCardDeck = styled(CardDeck)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export default StyledCardDeck;
