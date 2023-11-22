import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const CommunityIdContext = createContext();
export const CommunityIdProvider = ({ children }) => {
  // 로컬 스토리지에서 데이터 불러오기
  const storedCommunityDataID = localStorage.getItem('communityDataID');

  const [communityDataID, setCommunityDataID] = useState(
    storedCommunityDataID || null
  );

  // 로컬 스토리지에 데이터 저장하기
  useEffect(() => {
    localStorage.setItem('communityDataID', communityDataID);
  }, [communityDataID]);

  return (
    <CommunityIdContext.Provider
      value={{ communityDataID, setCommunityDataID }}
    >
      {children}
    </CommunityIdContext.Provider>
  );
};

export const useCommunityId = () => {
  const context = useContext(CommunityIdContext);
  if (!context) {
    throw new Error('useCommunityId must be used within a CommunityIdProvider');
  }
  return context;
};
