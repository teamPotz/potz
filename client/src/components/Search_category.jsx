import COLOR from '../utility/Color';
import styled from 'styled-components';
import BurgerImg from '../../public/images/graphicImg/CategoryBurger.png';
import CafeImg from '../../public/images/graphicImg/CategoryCafe.png';
import KoreanFoodImg from '../../public/images/graphicImg/CategoryKoreanFood.png';
import SushiImg from '../../public/images/graphicImg/CategorySushi.png';
import PizzaImg from '../../public/images/graphicImg/CategoryPizza.png';
import SaladImg from '../../public/images/graphicImg/CategorySalad.png';
import ChineseFoodImg from '../../public/images/graphicImg/CategoryChinese.png';
import ChickenImg from '../../public/images/graphicImg/CategoryChicken.png';

// 카테고리 small 컴포넌트 사용 방법:
//import { BurgerSM, CafeSM KoreanFoodSM, SushiSM, PizzaSM, SaladSM, ChickenSM, ChineseFoodSM} from '~~';

const Wrapper = styled.div`
  min-width: 90px;
  height: 90px;
  cursor: grab;
  background-color: ${COLOR.POTZ_PINK_100};
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${COLOR.POTZ_PINK_300};
  }
`;

export const BurgerSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={BurgerImg}></img>
    </Wrapper>
  );
};

export const CafeSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={CafeImg}></img>
    </Wrapper>
  );
};

export const KoreanFoodSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={KoreanFoodImg}></img>
    </Wrapper>
  );
};

export const SushiSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={SushiImg}></img>
    </Wrapper>
  );
};

export const PizzaSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={PizzaImg}></img>
    </Wrapper>
  );
};

export const SaladSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={SaladImg}></img>
    </Wrapper>
  );
};

export const ChickenSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={ChickenImg}></img>
    </Wrapper>
  );
};

export const ChineseFoodSM = () => {
  return (
    <Wrapper>
      <img width={80} height={80} src={ChineseFoodImg}></img>
    </Wrapper>
  );
};
