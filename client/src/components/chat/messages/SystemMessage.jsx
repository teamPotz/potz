import React from 'react';
import styled from 'styled-components';
import COLOR from '../../../utility/Color.js';
import timeAgoFormat from '../../../utility/timeAgo.js';
import speakerImg from '../../../../public/images/icons/speaker.svg';

function SystemMessage({ message }) {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      <div
        style={{
          backgroundColor: COLOR.WHITE,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
        }}
      >
        <img src={speakerImg} style={{ width: '29px' }} />
      </div>

      <Wrapper>
        {message.content.message.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
        <div
          style={{
            fontSize: '11px',
            display: 'flex',
            justifyContent: 'flex-end',
            color: COLOR.BLACK_OPACITY_300,
          }}
        >
          {timeAgoFormat(message.createdAt, 'ko')} | read{' '}
          {message.readBy?.length}
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  background-color: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  border-radius: 14px;
  width: auto;
  max-width: 276px;
  padding: 4px 14px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
`;

export default SystemMessage;
