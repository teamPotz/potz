import timeAgoFormat from '../../../utility/timeAgo.js';
import styled from 'styled-components';
import COLOR from '../../../utility/Color.js';

function TextMessage({ message, own }) {
  return (
    <>
      {!own && (
        <div style={{ fontSize: '14px', marginLeft: '4px' }}>
          {message.sender.name}
        </div>
      )}
      <Message $own={own}>
        {message.content.message}
        <div
          style={{
            fontSize: '11px',
            display: 'flex',
            justifyContent: 'flex-end',
            color: own ? COLOR.POTZ_PINK_200 : COLOR.BLACK_OPACITY_300,
          }}
        >
          {timeAgoFormat(message.createdAt, 'ko')} | 읽음{' '}
          {message.readBy?.length}
        </div>
      </Message>
    </>
  );
}

const Message = styled.div`
  background-color: ${(props) =>
    props.$own ? `${COLOR.POTZ_PINK_500}` : `${COLOR.WHITE}`};
  color: ${(props) => (props.$own ? `${COLOR.WHITE}` : `${COLOR.BLACK}`)};
  padding: 4px 14px;
  max-width: 276px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  border-radius: 14px;
  width: auto;

  &div {
    color: ${(props) => (props.$own ? `${COLOR.BLACK}` : `${COLOR.BLACK}`)};
  }
`;

export default TextMessage;
