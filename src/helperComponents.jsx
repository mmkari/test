import * as React from 'react';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components';

const HeaderContent = styled.div`
  height: 20px;
  width: 100%;
  background: red;
`;

const Header = ({ state }) => {
  return <HeaderContent>{`State is ${state}`}</HeaderContent>;
};

export default Header;
