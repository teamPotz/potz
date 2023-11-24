import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import Font from '../../../utility/Font';

const TextMessageWrapper = styled.div`
  background-color: ${(props) =>
    props.isMyMessage ? `${COLOR.POTZ_PINK_500}` : `${COLOR.WHITE}`};
  border-radius: 14px 14px 14px 14px;
  width: auto;
  max-width: 276.5px;
  padding: 4.66667px 14px;
  margin-left: ${(props) => (props.isMyMessage ? 'auto' : 'none')};
  margin-right: ${(props) => (props.isMyMessage ? 'none' : 'auto')};
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.3333px;
  color: ${(props) =>
    props.isMyMessage ? `${COLOR.WHITE}` : `${COLOR.BLACK}`};
  & > div {
    font-size: 14px;
    margin-right: ${(props) => (props.isMyMessage ? 'auto' : 'none')};
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isMyMessage ? 'none' : 'flex-end')};
  }
`;

function TextMessage({ content, isMyMessage }) {
  return (
    <TextMessageWrapper isMyMessage={isMyMessage}>{content}</TextMessageWrapper>
  );
}

export default TextMessage;
