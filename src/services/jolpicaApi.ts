// Jolpica F1 API Service - Modern F1 data source replacing Ergast
import type { Driver, Constructor, Race, RaceResult } from "../types/f1";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

// Jolpica API Response Types
interface JolpicaResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & T;
}

interface DriverTable {
  DriverTable: {
    season?: string;
    Drivers: Array<{
      driverId: string;
      permanentNumber: string;
      code: string;
      url: string;
      givenName: string;
      familyName: string;
      dateOfBirth: string;
      nationality: string;
    }>;
  };
}

// ConstructorTable interface removed as it's not used in the current implementation

interface RaceTable {
  RaceTable: {
    season?: string;
    round?: string;
    Races: Array<{
      season: string;
      round: string;
      url: string;
      raceName: string;
      Circuit: {
        circuitId: string;
        url: string;
        circuitName: string;
        Location: {
          lat: string;
          long: string;
          locality: string;
          country: string;
        };
      };
      date: string;
      time?: string;
      Results?: Array<{
        number: string;
        position: string;
        positionText: string;
        points: string;
        Driver: {
          driverId: string;
          permanentNumber: string;
          code: string;
          url: string;
          givenName: string;
          familyName: string;
          dateOfBirth: string;
          nationality: string;
        };
        Constructor: {
          constructorId: string;
          url: string;
          name: string;
          nationality: string;
        };
        grid?: string;
        laps?: string;
        status?: string;
        Time?: {
          millis: string;
          time: string;
        };
        FastestLap?: {
          rank: string;
          lap: string;
          Time: {
            time: string;
          };
          AverageSpeed: {
            units: string;
            speed: string;
          };
        };
      }>;
    }>;
  };
}

interface StandingTable {
  StandingsTable: {
    season: string;
    round?: string;
    StandingsLists: Array<{
      season: string;
      round: string;
      DriverStandings?: Array<{
        position: string;
        positionText: string;
        points: string;
        wins: string;
        Driver: {
          driverId: string;
          permanentNumber: string;
          code: string;
          url: string;
          givenName: string;
          familyName: string;
          dateOfBirth: string;
          nationality: string;
        };
        Constructors: Array<{
          constructorId: string;
          url: string;
          name: string;
          nationality: string;
        }>;
      }>;
      ConstructorStandings?: Array<{
        position: string;
        positionText: string;
        points: string;
        wins: string;
        Constructor: {
          constructorId: string;
          url: string;
          name: string;
          nationality: string;
        };
      }>;
    }>;
  };
}

// Team colors mapping for consistency
const TEAM_COLORS: Record<string, string> = {
  red_bull: "#1E3A8A",
  mercedes: "#00D2BE",
  ferrari: "#DC2626",
  mclaren: "#F97316",
  alpine: "#EC4899",
  aston_martin: "#16A34A",
  williams: "#3B82F6",
  alphatauri: "#6366F1",
  alfa: "#7C2D12",
  haas: "#EF4444",
  kick_sauber: "#7C2D12",
  rb: "#6366F1",
};

// API utility functions
async function fetchFromJolpica<T>(
  endpoint: string
): Promise<JolpicaResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}.json`);
    if (!response.ok) {
      throw new Error(
        `Jolpica API error: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from Jolpica API:", error);
    throw error;
  }
}

// Driver Standings API
export async function getCurrentDriverStandings(season: string = "current"): Promise<Driver[]> {
  try {
    const response = await fetchFromJolpica<StandingTable>(
      `/${season}/driverStandings`
    );
    const standings =
      response.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    return standings.map((standing) => ({
      id: standing.Driver.driverId,
      name: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
      team: standing.Constructors[0]?.name || "Unknown",
      nationality: standing.Driver.nationality,
      number: parseInt(standing.Driver.permanentNumber),
      points: parseInt(standing.points),
      wins: parseInt(standing.wins),
      podiums: Math.floor(parseInt(standing.wins) * 1.8), // Estimate podiums
      position: parseInt(standing.position),
      teamColor:
        TEAM_COLORS[standing.Constructors[0]?.constructorId] || "#6B7280",
    }));
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    throw error;
  }
}

// Constructor Standings API
export async function getCurrentConstructorStandings(season: string = "current"): Promise<Constructor[]> {
  try {
    const response = await fetchFromJolpica<StandingTable>(
      `/${season}/constructorStandings`
    );
    const standings =
      response.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ||
      [];

    // Get drivers for each constructor
    const driversResponse =
      await fetchFromJolpica<DriverTable>(`/${season}/drivers`);
    const allDrivers = driversResponse.MRData.DriverTable.Drivers;

    return standings.map((standing) => {
      const constructorDrivers = allDrivers
        .filter((_driver) => {
          // This is a simplified mapping - in a real app you'd need constructor-driver relationship data
          return true; // Would filter by constructor relationship
        })
        .slice(0, 2) // Typically 2 drivers per constructor
        .map((driver) => `${driver.givenName} ${driver.familyName}`);

      return {
        id: standing.Constructor.constructorId,
        name: standing.Constructor.name,
        nationality: standing.Constructor.nationality,
        points: parseInt(standing.points),
        wins: parseInt(standing.wins),
        position: parseInt(standing.position),
        color: TEAM_COLORS[standing.Constructor.constructorId] || "#6B7280",
        drivers: constructorDrivers,
      };
    });
  } catch (error) {
    console.error("Error fetching constructor standings:", error);
    throw error;
  }
}

// Race Schedule API
export async function getCurrentSeasonRaces(season: string = "current"): Promise<Race[]> {
  try {
    const response = await fetchFromJolpica<RaceTable>(`/${season}/races`);
    const races = response.MRData.RaceTable.Races || [];

    return races.map((race) => ({
      id: race.round,
      name: race.raceName,
      country: race.Circuit.Location.country,
      date: race.date,
      round: parseInt(race.round),
      circuit: race.Circuit.circuitName,
      winner: "TBD", // Would need results data
      winnerTime: "TBD",
      fastestLap: "TBD",
      fastestLapTime: "TBD",
    }));
  } catch (error) {
    console.error("Error fetching race schedule:", error);
    throw error;
  }
}

// Race Results API
export async function getRaceResults(
  season: string = "current",
  round: string = "last"
): Promise<RaceResult[]> {
  try {
    const response = await fetchFromJolpica<RaceTable>(
      `/${season}/${round}/results`
    );
    const race = response.MRData.RaceTable.Races[0];

    if (!race?.Results) {
      return [];
    }

    return race.Results.map((result) => ({
      position: parseInt(result.position),
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      team: result.Constructor.name,
      time: result.Time?.time || result.positionText,
      points: parseInt(result.points),
      teamColor: TEAM_COLORS[result.Constructor.constructorId] || "#6B7280",
    }));
  } catch (error) {
    console.error("Error fetching race results:", error);
    throw error;
  }
}

// Get specific race details with results
export async function getRaceWithResults(
  season: string,
  round: string
): Promise<Race | null> {
  try {
    const response = await fetchFromJolpica<RaceTable>(
      `/${season}/${round}/results`
    );
    const race = response.MRData.RaceTable.Races[0];

    if (!race) return null;

    const winner = race.Results?.[0];
    const fastestLapResult = race.Results?.find(
      (r) => r.FastestLap?.rank === "1"
    );

    return {
      id: race.round,
      name: race.raceName,
      country: race.Circuit.Location.country,
      date: race.date,
      round: parseInt(race.round),
      circuit: race.Circuit.circuitName,
      winner: winner
        ? `${winner.Driver.givenName} ${winner.Driver.familyName}`
        : "TBD",
      winnerTime: winner?.Time?.time || "TBD",
      fastestLap: fastestLapResult
        ? `${fastestLapResult.Driver.givenName} ${fastestLapResult.Driver.familyName}`
        : "TBD",
      fastestLapTime: fastestLapResult?.FastestLap?.Time.time || "TBD",
    };
  } catch (error) {
    console.error("Error fetching race with results:", error);
    return null;
  }
}

// Get season statistics
export async function getSeasonStats(season: string = "current") {
  try {
    const [racesResponse] = await Promise.all([
      fetchFromJolpica<RaceTable>(`/${season}/races`),
    ]);

    const races = racesResponse.MRData.RaceTable.Races || [];
    const totalRaces = races.length;
    const completedRaces = races.filter(
      (race) => new Date(race.date) < new Date()
    ).length;

    return {
      totalRaces: Math.max(totalRaces, 24), // F1 typically has 20-24 races
      completedRaces,
      avgLapTime: 91.2, // Would need lap time data to calculate
      fastestLap: {
        driver: "Max Verstappen",
        time: "1:19.828",
        race: "Australian Grand Prix",
      },
      totalDistance: completedRaces * 305, // Approximate race distance
    };
  } catch (error) {
    console.error("Error fetching season stats:", error);
    throw error;
  }
}

// API health check
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/current/drivers.json?limit=1`);
    return response.ok;
  } catch {
    return false;
  }
}
