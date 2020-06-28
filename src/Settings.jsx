import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import NumberInput from './NumberInput';
// import Button from './Button';

import ToggleButtons from './ToggleButtons';
// import RadioButtons, { RadioButtonsButton } from './RadioButtons';

// import Button from './Button';
import { ThemedButton as Button } from './Button';
import Input from './Input';

const TeamRowContainer = styled.div`
  display: inline-flex;
  input {
    flex-grow: 1;
    flex-shrink: 1;
  }
  button {
    padding: 0;
    display: flex;
  }
`;

const DeleteButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: auto;
  padding: 1em;
  width: 56px;
`;

const TeamRow = ({ name, onDelete, onChange, index }) => {
  return (
    <TeamRowContainer className="TeamRow">
      <Input
        type="text"
        onChange={(e) => onChange(index, e.target.value)}
        value={name}
        onFocus={(e) => e.target.select()}
        maxLength={50}
      />
      <DeleteButton onClick={() => onDelete(index)}>
        <DeleteIcon />
      </DeleteButton>
    </TeamRowContainer>
  );
};

const NameForm = ({ value, onChange, name, maxTeams = 4 }) => {
  // let order = value.length;
  const [order, setOrder] = React.useState(value.length + 1);

  const add = () => {
    if ((value || []).length >= maxTeams) return;
    onChange(name, [...value, `Team ${order}`]);
    setOrder(order + 1);
  };
  const deleteRow = (index) =>
    onChange(name, [...value.slice(0, index), ...value.slice(index + 1)]);

  const updateValue = (index, uVal) =>
    onChange(name, [...value.slice(0, index), uVal, ...value.slice(index + 1)]);

  return (
    <NameFormContainer>
      <h3>Added teams:</h3>
      {(value || []).length === 0
        ? 'None added'
        : value.map((team, index) => (
            <TeamRow
              name={team}
              index={index}
              onDelete={deleteRow}
              onChange={updateValue}
            />
          ))}
      <TeamAddButton disabled={(value || []).length >= maxTeams} onClick={add}>
        Add
      </TeamAddButton>
    </NameFormContainer>
  );
};

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 5em;
`;
const TeamAddButton = styled(Button)`
  width: 100%;
  min-width: 80px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background: lightgray;
  }
`;

const Settings = ({ values, onConfirm }) => {
  const [conf, setConf] = React.useState(values);
  const updateConf = (nam, val) => {
    if (typeof nam !== 'undefined' && typeof val !== 'undefined') {
      setConf({ ...conf, [nam]: val });
    }
  };
  const updateTeams = () => {};
  const confirmSettings = () => onConfirm(conf);
  const updateRadio = (e) => {
    const { value, name } = e.target;
    updateConf(name, value);
  };
  const updateToggle = (value, name) => {
    updateConf(name, value);
  };
  const updateToggle2 = (value, name) => {
    updateConf(name, value);
  };
  return (
    <SettingsContainer>
      <h3>Time limit</h3>
      <NumberInput
        name="timeLimit"
        unit={10}
        onChange={updateConf}
        value={conf.timeLimit}
      />
      <h3>Point goal</h3>
      <NumberInput
        name="endScore"
        unit={5}
        onChange={updateConf}
        value={conf.endScore}
      />
      <h3>Word list:</h3>

      <ToggleButtons
        onClick={updateToggle}
        options={[
          { title: 'Nouns', value: 'nouns' },
          { title: 'Adjectives', value: 'adjectives' },
          { title: 'Verbs', value: 'verbs' },
        ]}
        name="wordClass"
        value={conf.wordClass}
      />

      <NameForm value={conf.teams} onChange={updateConf} name="teams" />
      {/* <div>Num teams</div> */}
      <TeamAddButton onClick={confirmSettings}>
        <DoneIcon /> Confirm
      </TeamAddButton>
    </SettingsContainer>
  );
};

export default Settings;
