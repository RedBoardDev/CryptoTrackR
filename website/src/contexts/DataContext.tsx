import React, {
  createContext, useContext, useEffect, useCallback, ReactNode, useMemo, useState,
} from 'react';
import ApiRoutesNames from '@enums/ApiRoutesEnum.tsx';
import DataStorageTypes from '@enums/DataStorageTypes.tsx';
// import { fetchEncapsulation } from '@services/fetchEncapsulation.tsx';

interface Data {
  type: DataStorageTypes,
  apiUrl: string | false;
  storage: boolean,
  refresh: boolean,
}

const dataNodes: Data[] = [
  // {
  //   type: DataStorageTypes.etablishements,
  //   apiUrl: ApiRoutesNames.GET_ESTABLISHMENTS,
  //   storage: true,
  //   refresh: false,
  // },
];

interface DataContextType {
  fetchStoredData: (type: DataStorageTypes) => Promise<[] | null>;
  saveDataToStorage: (type: DataStorageTypes, data: string) => void;
  refreshStorage: (type?: DataStorageTypes) => any;
  clearStorage: (type?: DataStorageTypes) => void;
  updatedDataTypes: DataStorageTypes[];
  deleteUpdate: (type: DataStorageTypes) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataStorage = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useDataStorage must be used within a DataProvider');
  return context;
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [updatedDataTypes, setUpdatedDataTypes] = useState<DataStorageTypes[]>([]);

  const fetchDataFromAPI = useCallback(async (url: string, storage: boolean, type?: string): Promise<[]> => {
    try {
      const rsp = await fetchEncapsulation(url, 'GET');
      const receivedData = await rsp.json();
      if (rsp.status !== 200) throw new Error(receivedData.status);
      if (!receivedData.data) throw new Error('No data received');
      const { data } = receivedData;
      if (storage && type) {
        sessionStorage.setItem(type, JSON.stringify(data));
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }, []);

  const fetchStoredData = useCallback(async (type: DataStorageTypes): Promise<[] | null> => {
    const node = dataNodes.find((node) => node.type === type);
    if (!node) return null;

    const typeString = DataStorageTypes[type].toString();
    if (node.storage) {
      const storedData = sessionStorage.getItem(typeString);
      if (storedData) {
        return JSON.parse(storedData);
      }
    }

    try {
      if (node.apiUrl === false) return null;
      const data = await fetchDataFromAPI(node.apiUrl as string, node.storage, typeString);
      return data;
    } catch (error) {
      console.error('Error fetching stored data:', error);
      return null;
    }
  }, [fetchDataFromAPI]);

  const saveDataToStorage = useCallback((type: DataStorageTypes, data: string): void => {
    const node = dataNodes.find((node) => node.type === type);
    if (!node) return;

    const typeString = DataStorageTypes[type].toString();
    if (node.storage) {
      sessionStorage.setItem(typeString, data);
      if (node.refresh) setUpdatedDataTypes((prevUpdatedDataTypes) => [...prevUpdatedDataTypes, type]);
    }
  }, []);

  const clearStorage = useCallback((type?: DataStorageTypes) => {
    if (!type) {
      dataNodes.forEach((node) => {
        const typeString = DataStorageTypes[node.type].toString();
        sessionStorage.removeItem(typeString);
      });
      return;
    }
    const node = dataNodes.find((node) => node.type === type);
    if (!node) return;
    sessionStorage.removeItem(DataStorageTypes[node.type].toString());
  }, []);

  const refreshStorage = useCallback((type?: DataStorageTypes): any => {
    if (type === undefined || type === null) {
      dataNodes.forEach((node) => {
        if (node.apiUrl === false) return;
        fetchDataFromAPI(node.apiUrl, node.storage, DataStorageTypes[node.type].toString())
          .catch((error) => console.error('Error fetching data:', error));
      });
      return null;
    }
    const node = dataNodes.find((node) => node.type === type);
    if (!node) return null;
    if (node.apiUrl === false) return null;
    const data = fetchDataFromAPI(node.apiUrl, node.storage, DataStorageTypes[node.type].toString())
      .catch((error) => console.error('Error fetching data:', error));
    return data;
  }, [fetchDataFromAPI]);

  const deleteUpdate = useCallback((type: DataStorageTypes) => {
    setUpdatedDataTypes((prevUpdatedDataTypes) => prevUpdatedDataTypes.filter((t) => t !== type));
  }, []);

  useEffect(() => {
    refreshStorage();
  }, [refreshStorage]);

  const contextValue = useMemo(() => ({
    fetchStoredData,
    saveDataToStorage,
    refreshStorage,
    clearStorage,
    updatedDataTypes,
    deleteUpdate,
  }), [fetchStoredData, saveDataToStorage, refreshStorage, clearStorage, updatedDataTypes, deleteUpdate]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}
