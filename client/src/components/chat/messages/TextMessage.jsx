import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import Font from '../../../utility/Font';
import timeAgoFormat from '../../../utility/timeAgo.js';

function TextMessage({ message, own }) {
  return (
    <TextMessageWrapper $own={own}>
      {message.content.message}
      <div>
        {timeAgoFormat(message.createdAt, 'ko')} | read {message.readBy?.length}
      </div>
    </TextMessageWrapper>
  );
}

const TextMessageWrapper = styled.div`
  background-color: ${(props) =>
    props.$own ? `${COLOR.POTZ_PINK_500}` : `${COLOR.WHITE}`};
  border-radius: 14px 14px 14px 14px;
  width: auto;
  max-width: 276px;
  padding: 4px 14px;
  margin-left: ${(props) => (props.$own ? 'auto' : 'none')};
  margin-right: ${(props) => (props.$own ? 'none' : 'auto')};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.$own ? `${COLOR.WHITE}` : `${COLOR.BLACK}`)};
  & > div {
    font-size: 12px;
    // display: flex;
    // align-items: center;
    // margin-right: ${(props) => (props.$own ? 'auto' : 'none')};
    // justify-content: ${(props) => (props.$own ? 'none' : 'flex-end')};
  }
`;

export default TextMessage;
