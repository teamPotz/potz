import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color';

const SearchBar = () => {
  const [searchVal, setSearchVal] = useState();
  const navigate = useNavigate();

  const onEnterHandler = (event) => {
    // 엔터 키가 눌렸을 때만 키워드 검색 및 키워드 히스토리 저장 함수 호출
    if (event.keyCode !== 13) return;

    fetchSearchData();
    postSearchHistory();
  };

  const fetchSearchData = async () => {
    try {
      const communityId = localStorage.getItem('communityDataID');
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/posts/search?key=${searchVal}&communityId=${communityId}`,
        { credentials: 'include' }
      );
      const data = await response.json();
      // console.log('검색 데이터', data);
      navigate('/search/result', {
        state: { result: data, searchVal: searchVal },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postSearchHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/search-history`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ keyword: searchVal }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log('새로운 검색어 저장:', responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <InputWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <InputSearch
        value={searchVal}
        onChange={onChangeHandler}
        onKeyUp={onEnterHandler}
        placeholder='맛있는 키워드로 검색해보세요.'
      />
    </InputWrapper>
  );
};

const SearchIcon = () => {
  return (
    <svg
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12.9163'
        cy='12.5833'
        r='7.58333'
        stroke='#808080'
        strokeWidth='1.75'
        strokeLinejoin='round'
      />
      <path
        d='M23.3811 24.2855C23.7228 24.6273 24.2768 24.6273 24.6186 24.2855C24.9603 23.9438 24.9603 23.3898 24.6186 23.0481L23.3811 24.2855ZM24.6186 23.0481L18.7852 17.2148L17.5478 18.4522L23.3811 24.2855L24.6186 23.0481Z'
        fill='#808080'
      />
    </svg>
  );
};

const InputSearch = styled.input`
  font-size: 14px;
  font-weight: 400;
  margin-left: 18px;
  width: 75%;
  border: none;
  background-color: ${COLOR.POTZ_PINK_100};
  color: ${COLOR.GRAY_400};
  &:focus {
    outline: none;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  background-color: ${COLOR.POTZ_PINK_100};
  border: none;
  width: 88%;
  height: 46px;
  flex-shrink: 0;
  border-radius: 12px;
  align-items: center;
`;

const SearchIconWrapper = styled.div`
  margin-left: 20px;
  margin-top: 4px;
`;

export default SearchBar;
