import { createContext, useContext, useState, useEffect } from 'react';

const CommunityIdContext = createContext();

export const CommunityIdProvider = ({ children }) => {
  const [communityDataIDs, setCommunityDataID] = useState(null);

  useEffect(() => {
    const storedCommunityDataID = localStorage.getItem('communityDataID');
    if (storedCommunityDataID !== null) {
      setCommunityDataID(storedCommunityDataID);
    }
  }, []);

  useEffect(() => {
    if (communityDataIDs !== null) {
      localStorage.setItem('communityDataID', communityDataIDs);
    }
  }, [communityDataIDs]);

  return (
    <CommunityIdContext.Provider
      value={{ communityDataIDs, setCommunityDataID }}
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
