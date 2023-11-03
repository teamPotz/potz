import React, { useEffect, useState } from 'react';
import COLOR from '../utility/Color';
import styled from 'styled-components';

const ChatInput = () => {
  const [message, setMessage] = useState([]);
  const [opponentMessage, setOpponentMessage] = useState([]);
  const [temp, setTemp] = useState('');

  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18.67px;
    position: relative;
    width: 420px;
    height: 62.33px;
    margin: 28px;
    margin-top: 0px;
  `;

  const DeleteButton = styled.img.attrs({
    src: 'images/components/Frame 10964.png',
    alt: 'deletebutton',
  })`
    cursor: pointer;
    width: 28px;
    height: 28px;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  `;

  const Input = styled.input`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 9.33333px 14px 9.33333px 14px;
    gap: 105px;
    width: 290.67px;
    height: 43.67px;
    background: ${COLOR.GRAY_100};
    border-radius: 50.1667px;
    border: none;

    transition: 0.2s;
    &:focus {
      outline: none;
      background: ${COLOR.GRAY_200};
    }

    width: 262.667px;
    height: 25px;
    font-family: 'Noto Sans CJK KR'; //수정예정
    font-style: normal;
    font-weight: 400;
    font-size: 16.3333px;
    line-height: 150%;
    /* identical to box height, or 25px */
    display: flex;
    align-items: center;
    color: ${COLOR.GRAY_500};
  `;

  const SendButton = styled.img.attrs({
    src: 'images/components/Frame 11055.png',
    alt: 'sendbutton',
  })`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 11.67px;
    cursor: pointer;
    width: 28px;
    height: 28px;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  `;
  const Message = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <DeleteButton />
        <Input onChange={Message} />
        <SendButton />
      </Wrapper>
    </>
  );
};

export default ChatInput;
