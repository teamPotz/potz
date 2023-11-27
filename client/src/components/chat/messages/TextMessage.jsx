import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import Font from '../../../utility/Font';

const TextMessageWrapper = styled.div`
  background-color: ${(props) =>
    props.own ? `${COLOR.POTZ_PINK_500}` : `${COLOR.WHITE}`};
  border-radius: 14px 14px 14px 14px;
  width: auto;
  max-width: 276.5px;
  padding: 4.66667px 14px;
  margin-left: ${(props) => (props.own ? 'auto' : 'none')};
  margin-right: ${(props) => (props.own ? 'none' : 'auto')};
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.3333px;
  color: ${(props) => (props.own ? `${COLOR.WHITE}` : `${COLOR.BLACK}`)};
  & > div {
    font-size: 14px;
    margin-right: ${(props) => (props.own ? 'auto' : 'none')};
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.own ? 'none' : 'flex-end')};
  }
`;

function TextMessage({ content, own }) {
  return (
    <TextMessageWrapper own={own.toString()}>{content}</TextMessageWrapper>
  );
}

export default TextMessage;
