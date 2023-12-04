import styled from 'styled-components';
import COLOR from '../../utility/Color';
import CheckIcon from './assets/CheckIcon';

const ChatButton = ({ title, icon, onClick, isCompleted }) => {
  return (
    <Wrapper onClick={isCompleted ? null : onClick}>
      {isCompleted ? (
        <Icon $iscompleted={isCompleted.toString()}>
          <CheckIcon />
        </Icon>
      ) : (
        <Icon>{icon}</Icon>
      )}
      <Text>{`${title} ${isCompleted ? ' 완료' : ''}`}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: ${COLOR.WHITE};
`;

const Icon = styled.div`
  background: ${COLOR.GRAY_100};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: ${(props) => (props.$iscompleted ? 'default' : 'pointer')};

  &:hover {
    background: ${(props) =>
      props.$iscompleted ? COLOR.GRAY_100 : COLOR.GRAY_200};
    transition: 0.2s ease-in-out;
  }
`;

const Text = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  white-space: nowrap;
  color: ${COLOR.BLACK};
`;

export default ChatButton;
