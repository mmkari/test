// @flow
import * as React from 'react';
import styled from 'styled-components';
// import classnames from 'classnames';
// import { CSSTransition } from 'react-transition-group';
// import Button from './Button';

const RadioButtonsButton = ({
  onChange,
  name,
  value,
  currentValue,
  title,
  children,
}) => {
  //
  const handleChange = () => {
    // const { value, name } = e.target;
    // use props instead to preserve value type (radio returns string)
    onChange(value, name);
  };

  return (
    <label htmlFor={`radio-${name}-${value}`}>
      <input
        id={`radio-${name}-${value}`}
        type="radio"
        name={name}
        value={value}
        checked={currentValue === value}
        onChange={handleChange}
      />
      {title || children}
    </label>
  );
};

const RadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type ValueProp = string | number;
type OptionObject = {| value: ValueProp, title: string |};
type Props = {|
  onChange: (value: ValueProp, name: string) => void,
  // options: Array<OptionObject>,
  children: Array<OptionObject>,
  name: string,
  value: ValueProp,
|};
const RadioButtons = ({ onChange, name, value, children }: Props) => {
  //
  return (
    <RadioButtonsContainer className="RadioButtons">
      {children.map((element) =>
        React.cloneElement(element, { onChange, currentValue: value, name })
      )}
    </RadioButtonsContainer>
  );
};

export default RadioButtons;
export { RadioButtonsButton as RadioButton };
