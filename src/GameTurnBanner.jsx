// @flow
import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
// import Button from './Button';
import { ThemedButton as Button } from './Button';
import withThemeContext from './withThemeContext';

const Banner = styled.div`
  background: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.highlight};
  height: 60px;
  font-size: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 1em;
  display: flex;
  align-items: center;
  // justify-content: center;

  button {
    // position: absolute;
  }
  span {
    flex-grow: 1;
  }
`;

const BannerButton = styled(Button)`
  height: 80%;
  min-width: 10vh;
`;

type Props = {|
  teamName: string,
  onBackClick: Function,
  showScores: Function,
|};
const GameTurnBanner = ({
  teamName,
  onBackClick,
  showScores,
  theme,
  toggleSecondScreen
}: Props) => {
  //
  return (
    <Banner theme={theme}>
      <BannerButton onClick={onBackClick}>
        <ArrowBackIcon />
      </BannerButton>
      <span>{teamName}</span>
      <BannerButton onClick={showScores}>
        <FormatListNumberedIcon />
      </BannerButton>
      <BannerButton onClick={toggleSecondScreen}>
        <ScreenShareIcon />
      </BannerButton>
    </Banner>
  );
};

const WrappedBanner = withThemeContext(GameTurnBanner);

export default WrappedBanner;
