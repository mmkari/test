import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

// import Button from './Button';
import { ThemedButton as Button } from './Button';
import Input from './Input';

const NumberInputContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  button {
    // height: auto;
    width: 56px;
  }
`;

const formatNumber = (value) => {
  //
  const num = parseInt(value, 10);
  return Number.isNaN(num) || num < 0 ? 0 : num;
};
const handleFocus = (e) => e.target.select();

const NumberInput = ({ unit = 1, onChange, value, name }) => {
  const unitText = unit !== 1 ? unit : null;
  return (
    <NumberInputContainer className="NumberInput">
      <Button onClick={() => onChange(name, formatNumber(value - unit))}>
        {`-${unitText !== null ? unitText : ''}`}
      </Button>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(name, formatNumber(e.target.value))}
        onFocus={handleFocus}
      />
      <Button onClick={() => onChange(name, formatNumber(value + unit))}>
        {`+${unitText !== null ? unitText : ''}`}
      </Button>
    </NumberInputContainer>
  );
};

export default NumberInput;
