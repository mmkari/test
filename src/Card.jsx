import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

const Card = ({ className, header, children, lang }) => {
  return (
    <div className={classnames('Card', className)}>
      {header && <div className="Card-header">{header}</div>}
      <div lang={lang}>{children}</div>
    </div>
  );
};

const StyledCard = styled(Card)`
  position: relative;
  background: white;
  border: 1px solid lightgray;
  width: 200px;
  height: ${({ height }) => height}px;
  border-radius: 4px;
  top: 0;

  .Card-header {
    border-bottom: 1px solid lightgray;
  }
`;

export default StyledCard;
