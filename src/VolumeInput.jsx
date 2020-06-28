import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import StarPicker from 'react-star-picker';

const Button = styled.button`
  background: green;
  height: 30px;
  width: 30px;
`;

const SpeakerSvg = ({
  width,
  height,
  fill = '#777',
  muted,
  stroke = '#444',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 75 75"
    >
      <path
        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
        stroke={stroke}
        strokeWidth={5}
        fill={fill}
      />
      {muted ? (
        <>
          <path
            d="M 48.651772,50.269646 69.395223,25.971024"
            stroke={stroke}
            strokeWidth={5}
            fill="none"
          />
          <path
            d="M 69.395223,50.269646 48.651772,25.971024"
            stroke={stroke}
            strokeWidth={5}
            fill="none"
          />
        </>
      ) : (
        <path
          d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
          stroke={stroke}
          strokeWidth={5}
          fill="none"
        />
      )}
    </svg>
  );
};

const SpeakerButton = styled.button`
  border: none;
  background: inherit;
`;

const SvgBar = ({ width, height, fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <rect width={width} height={height} fill={fill} />
    </svg>
  );
};

const customStarRenderer = ({ index, selectedIndex }) => {
  //
  const selected = index <= selectedIndex;

  const color = selected ? '#1ca363' : 'grey';
  return (
    <SvgBar width={16} height={(40 * (index + 1)) / 5.0 + 20} fill={color}>
      a
    </SvgBar>
  );
};

const VolumeInputContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const VolumeInput = ({ unit = 1, onChange, value, name }) => {
  const val = value * 5;

  const formatValue = (intValue) => {
    return intValue / 5.0;
  };

  const toggleMute = () => {
    //
    onChange(value === 0 ? 1 : 0);
  };

  return (
    <VolumeInputContainer className="VolumeInput">
      <SpeakerButton type="button" onClick={toggleMute}>
        <SpeakerSvg width={30} height={30} muted={val === 0} />
      </SpeakerButton>
      <StarPicker
        size={20}
        value={val}
        onChange={(v) => onChange(formatValue(v))}
        starRenderer={customStarRenderer}
      />
    </VolumeInputContainer>
  );
};

export default VolumeInput;
