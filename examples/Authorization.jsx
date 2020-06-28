// @flow
import * as React from 'react';
import styled from 'styled-components';
import SHA256 from 'crypto-js/sha256';
import hexEnc from 'crypto-js/enc-hex';

const PassContainer = styled.div`
  margin: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type AuthorizationProps = {|
  setAuthorized: (v: boolean) => void,
|};
const Authorization = ({ setAuthorized }: AuthorizationProps) => {
  const [pass, setPass] = React.useState('');

  const checkPass = () => {
    const hash = SHA256(pass || '');
    const encoded = hash.toString(hexEnc);
    // console.log('ENC', encoded);
    const target =
      '1a0a6a36ca0a3953b997ddaeb722cb31e9e421b038f6a67ef55593f21dcf92b1';
    if (encoded === target) {
      setAuthorized(true);
    }
  };

  const onChange = (e) => {
    setPass(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkPass();
    }
  };

  return (
    <PassContainer>
      <input
        autoFocus
        type="text"
        value={pass}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button onClick={checkPass}>Enter</button>
    </PassContainer>
  );
};

export default Authorization;
