import React, { createContext, useContext, useState } from 'react';
import { useF1Data } from '../hooks/useF1Data';
import type { Driver, Constructor, Race, RaceResult, SeasonStats } from '../types/f1';

interface F1DataContextType {
  drivers: Driver[];
  constructors: Constructor[];
  races: Race[];
  seasonStats: SeasonStats;
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  refreshData: () => Promise<void>;
  getRaceResults: (season?: string, round?: string) => Promise<RaceResult[]>;
  getRaceDetails: (season: string, round: string) => Promise<Race | null>;
}

const F1DataContext = createContext<F1DataContextType | undefined>(undefined);

export const F1DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f1Data = useF1Data("current");

  return (
    <F1DataContext.Provider value={f1Data}>
      {children}
    </F1DataContext.Provider>
  );
};

export const useF1DataContext = () => {
  const context = useContext(F1DataContext);
  if (!context) {
    throw new Error('useF1DataContext must be used within a F1DataProvider');
  }
  return context;
};