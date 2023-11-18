{
  /* 사용 방법
<ChatRequireButton imageURL={"images/components/icon-coin-mono.png"} text={'정산 요청'}></ChatRequireButton>
<ChatRequireButton imageURL={"images/components/Union.png"} text={'메뉴 요청'}></ChatRequireButton>
<ChatRequireButton imageURL={"images/components/Arrow - Right Square.png"} text={'수령 요청'}></ChatRequireButton> */
}

import React from 'react';
import COLOR from '../../utility/Color';
import styled from 'styled-components';
import Font from '../../utility/Font';

const ChatRequireButton = (props) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 7.33px;
    position: relative;
    width: 70px;
    height: 100.33px;
    background: ${COLOR.WHITE};
  `;

  const Icon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 21px;
    gap: 11.67px;
    width: 28px;
    height: 28px;
    background: ${COLOR.GRAY_100};
    border-radius: 49px;
    cursor: pointer;

    transition: 0.2s;
    &:hover {
      background: ${COLOR.GRAY_200};
    }
  `;

  const Coin = styled.img.attrs({
    src: props.imageURL,
    alt: 'icon',
  })`
    width: 28px;
    height: 28px;
  `;

  const Text = styled.div`
    width: 54.83px;
    height: 21px;
    font-family: ${Font.FontKor};
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: ${COLOR.BLACK};
  `;

  return (
    <>
      <Wrapper>
        <Icon>
          <Coin />
        </Icon>
        <Text>{props.text}</Text>
      </Wrapper>
    </>
  );
};

export default ChatRequireButton;
