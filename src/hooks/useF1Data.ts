import { useState, useEffect, useCallback } from "react";
import {
  getCurrentDriverStandings,
  getCurrentConstructorStandings,
  getCurrentSeasonRaces,
  getRaceResults,
  getRaceWithResults,
  getSeasonStats,
  checkApiHealth,
} from "../services/jolpicaApi";
import type {
  Driver,
  Constructor,
  Race,
  RaceResult,
  SeasonStats,
} from "../types/f1";
import {
  mockDrivers,
  mockConstructors,
  mockRaces,
  getMockRaceResults,
  mockSeasonStats,
} from "../data/f1Data";

interface UseF1DataReturn {
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

export const useF1Data = (initialSeason: string = "current"): UseF1DataReturn => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [constructors, setConstructors] =
    useState<Constructor[]>(mockConstructors);
  const [races, setRaces] = useState<Race[]>(mockRaces);
  const [seasonStats, setSeasonStats] = useState<SeasonStats>(mockSeasonStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);

  // Check if Jolpica API is available
  const checkConnection = useCallback(async () => {
    try {
      const apiHealthy = await checkApiHealth();
      setIsOnline(apiHealthy);
      return apiHealthy;
    } catch {
      setIsOnline(false);
      return false;
    }
  }, []);

  // Fetch all F1 data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiAvailable = await checkConnection();

      if (apiAvailable) {
        console.log("🏎️ Fetching live data from Jolpica F1 API...");

        // Fetch data in parallel for better performance
        const [driversData, constructorsData, racesData, statsData] =
          await Promise.allSettled([
            getCurrentDriverStandings(selectedSeason),
            getCurrentConstructorStandings(selectedSeason),
            getCurrentSeasonRaces(selectedSeason),
            getSeasonStats(selectedSeason),
          ]);

        // Update drivers if successful
        if (
          driversData.status === "fulfilled" &&
          driversData.value.length > 0
        ) {
          setDrivers(driversData.value);
          console.log("✅ Driver standings updated");
        } else {
          console.log("⚠️ Using mock driver data");
        }

        // Update constructors if successful
        if (
          constructorsData.status === "fulfilled" &&
          constructorsData.value.length > 0
        ) {
          setConstructors(constructorsData.value);
          console.log("✅ Constructor standings updated");
        } else {
          console.log("⚠️ Using mock constructor data");
        }

        // Update races if successful
        if (racesData.status === "fulfilled" && racesData.value.length > 0) {
          // Enhance race data with results for completed races
          const enhancedRaces = await Promise.all(
            racesData.value.map(async (race) => {
              const isPastRace = new Date(race.date) < new Date();
              if (isPastRace) {
                try {
                  const raceWithResults = await getRaceWithResults(
                    selectedSeason === "current" ? "current" : selectedSeason,
                    race.round.toString()
                  );
                  return raceWithResults || race;
                } catch {
                  return race;
                }
              }
              return race;
            })
          );
          setRaces(enhancedRaces);
          console.log("✅ Race calendar updated");
        } else {
          console.log("⚠️ Using mock race data");
        }

        // Update season stats if successful
        if (statsData.status === "fulfilled") {
          setSeasonStats(statsData.value);
          console.log("✅ Season statistics updated");
        } else {
          console.log("⚠️ Using mock season stats");
        }
      } else {
        console.log(
          "🔄 Jolpica API unavailable, using mock data for demonstration"
        );
        setError("Live data temporarily unavailable. Showing demo data.");
        // Mock data is already set as initial state
      }
    } catch (err) {
      console.error("Error fetching F1 data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch F1 data");
      // Keep using mock data on error
    } finally {
      setIsLoading(false);
    }
  }, [checkConnection, selectedSeason]);

  // Get race results for a specific race
  const getRaceResultsCallback = useCallback(
    async (season = "current", round = "last"): Promise<RaceResult[]> => {
      try {
        if (isOnline) {
          return await getRaceResults(season, round);
        } else {
          // Return mock data when offline
          return getMockRaceResults(round);
        }
      } catch (error) {
        console.error("Error fetching race results:", error);
        return getMockRaceResults(round);
      }
    },
    [isOnline]
  );

  // Get detailed race information
  const getRaceDetailsCallback = useCallback(
    async (season: string, round: string): Promise<Race | null> => {
      try {
        if (isOnline) {
          return await getRaceWithResults(season, round);
        } else {
          // Return mock data when offline
          const mockRace = mockRaces.find((r) => r.id === round);
          return mockRace || null;
        }
      } catch (error) {
        console.error("Error fetching race details:", error);
        const mockRace = mockRaces.find((r) => r.id === round);
        return mockRace || null;
      }
    },
    [isOnline]
  );

  // Refresh data
  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Initial data fetch and refetch when season changes
  useEffect(() => {
    fetchData();
  }, [fetchData, selectedSeason]);

  // Refresh data every 5 minutes when online
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(
      () => {
        console.log("🔄 Auto-refreshing F1 data...");
        fetchData();
      },
      5 * 60 * 1000
    ); // 5 minutes

    return () => clearInterval(interval);
  }, [isOnline, fetchData]);

  return {
    drivers,
    constructors,
    races,
    seasonStats,
    isLoading,
    error,
    isOnline,
    selectedSeason,
    setSelectedSeason,
    refreshData,
    getRaceResults: getRaceResultsCallback,
    getRaceDetails: getRaceDetailsCallback,
  };
};
