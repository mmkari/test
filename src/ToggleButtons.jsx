// @flow
import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
// import Button from './Button';
import { ThemedButton as Button } from './Button';

const ToggleButtonsButton = styled(Button)`
  height: 100%;
  max-width: 150px;
`;

const ToggleButtonsContainer = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  .ToggleButtonsButton + .ToggleButtonsButton {
    border-left: none;
  }
`;

type ValueProp = string | number;
type OptionObject = {| value: ValueProp, title: string |};
type Props = {|
  onClick: (value: ValueProp, name: string) => void,
  options: Array<OptionObject>,
  name: string,
  value: ValueProp,
|};
const ToggleButtons = ({ onClick, options, name, value }: Props) => {
  //
  return (
    <ToggleButtonsContainer className="ToggleButtons">
      {options.map((option) => (
        <ToggleButtonsButton
          className={classnames('ToggleButtonsButton', {
            checked: value === option.value,
          })}
          onClick={() => onClick(option.value, name)}
          checked={value === option.value}
        >
          {option.title}
        </ToggleButtonsButton>
      ))}
    </ToggleButtonsContainer>
  );
};

export default ToggleButtons;
