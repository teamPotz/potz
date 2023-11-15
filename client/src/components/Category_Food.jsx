import COLOR from '../utility/Color';
import styled from 'styled-components';
import TagFood from './TagFood';
import BurgerImg from '../../public/images/graphicImg/CategoryBurger.png';
import CafeImg from '../../public/images/graphicImg/CategoryCafe.png';
import KoreanFoodImg from '../../public/images/graphicImg/CategoryKoreanFood.png';
import SushiImg from '../../public/images/graphicImg/CategorySushi.png';
import PizzaImg from '../../public/images/graphicImg/CategoryPizza.png';
import SaladImg from '../../public/images/graphicImg/CategorySalad.png';
import ChineseFoodImg from '../../public/images/graphicImg/CategoryChinese.png';
import ChickenImg from '../../public/images/graphicImg/CategoryChicken.png';

// 카테고리 컴포넌트 사용 방법:
//import { Burger, Cafe, KoreanFood, Sushi, Pizza, Salad, Chicken, ChineseFood} from '../components/Category_Food';

const FoodWrapper = styled.div`
  padding-bottom: 18px;
  width: 48%;
  height: 100%;
  cursor: grab;
  background-color: ${COLOR.WHITE};
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

export const Burger = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={BurgerImg}></img>
      <TagFood>버거 • 샌드위치</TagFood>
    </FoodWrapper>
  );
};

export const Cafe = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={CafeImg}></img>
      <TagFood>카페 • 디저트</TagFood>
    </FoodWrapper>
  );
};

export const KoreanFood = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={KoreanFoodImg}></img>
      <TagFood>한식</TagFood>
    </FoodWrapper>
  );
};

export const Sushi = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={SushiImg}></img>
      <TagFood>초밥 • 회</TagFood>
    </FoodWrapper>
  );
};

export const Pizza = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={PizzaImg}></img>
      <TagFood>피자</TagFood>
    </FoodWrapper>
  );
};

export const Salad = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={SaladImg}></img>
      <TagFood>샐러드</TagFood>
    </FoodWrapper>
  );
};

export const Chicken = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={ChickenImg}></img>
      <TagFood>치킨</TagFood>
    </FoodWrapper>
  );
};

export const ChineseFood = (props) => {
  let { navigateHandler } = props;

  return (
    <FoodWrapper onClick={navigateHandler}>
      <img width={108} height={108} src={ChineseFoodImg}></img>
      <TagFood>중식 • 아시안</TagFood>
    </FoodWrapper>
  );
};
