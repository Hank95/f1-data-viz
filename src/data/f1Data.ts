import type {
  Driver,
  Constructor,
  Race,
  LapTime,
  RaceResult,
  SeasonStats,
  TelemetryData,
} from "../types/f1";

// Team colors for consistent branding
export const TEAM_COLORS = {
  "Red Bull Racing": "#1E3A8A",
  Mercedes: "#00D2BE",
  Ferrari: "#DC2626",
  McLaren: "#F97316",
  Alpine: "#EC4899",
  "Aston Martin": "#16A34A",
  Williams: "#3B82F6",
  AlphaTauri: "#6366F1",
  "Alfa Romeo": "#7C2D12",
  Haas: "#EF4444",
};

export const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    nationality: "Netherlands",
    number: 1,
    points: 575,
    wins: 19,
    podiums: 21,
    position: 1,
    teamColor: TEAM_COLORS["Red Bull Racing"],
  },
  {
    id: "2",
    name: "Sergio Pérez",
    team: "Red Bull Racing",
    nationality: "Mexico",
    number: 11,
    points: 285,
    wins: 2,
    podiums: 8,
    position: 2,
    teamColor: TEAM_COLORS["Red Bull Racing"],
  },
  {
    id: "3",
    name: "Lewis Hamilton",
    team: "Mercedes",
    nationality: "United Kingdom",
    number: 44,
    points: 234,
    wins: 3,
    podiums: 7,
    position: 3,
    teamColor: TEAM_COLORS["Mercedes"],
  },
  {
    id: "4",
    name: "Fernando Alonso",
    team: "Aston Martin",
    nationality: "Spain",
    number: 14,
    points: 206,
    wins: 1,
    podiums: 8,
    position: 4,
    teamColor: TEAM_COLORS["Aston Martin"],
  },
  {
    id: "5",
    name: "Carlos Sainz Jr.",
    team: "Ferrari",
    nationality: "Spain",
    number: 55,
    points: 200,
    wins: 1,
    podiums: 6,
    position: 5,
    teamColor: TEAM_COLORS["Ferrari"],
  },
  {
    id: "6",
    name: "George Russell",
    team: "Mercedes",
    nationality: "United Kingdom",
    number: 63,
    points: 175,
    wins: 1,
    podiums: 4,
    position: 6,
    teamColor: TEAM_COLORS["Mercedes"],
  },
  {
    id: "7",
    name: "Charles Leclerc",
    team: "Ferrari",
    nationality: "Monaco",
    number: 16,
    points: 165,
    wins: 2,
    podiums: 5,
    position: 7,
    teamColor: TEAM_COLORS["Ferrari"],
  },
  {
    id: "8",
    name: "Lando Norris",
    team: "McLaren",
    nationality: "United Kingdom",
    number: 4,
    points: 115,
    wins: 0,
    podiums: 3,
    position: 8,
    teamColor: TEAM_COLORS["McLaren"],
  },
  {
    id: "9",
    name: "Lance Stroll",
    team: "Aston Martin",
    nationality: "Canada",
    number: 18,
    points: 74,
    wins: 0,
    podiums: 1,
    position: 9,
    teamColor: TEAM_COLORS["Aston Martin"],
  },
  {
    id: "10",
    name: "Oscar Piastri",
    team: "McLaren",
    nationality: "Australia",
    number: 81,
    points: 97,
    wins: 0,
    podiums: 2,
    position: 10,
    teamColor: TEAM_COLORS["McLaren"],
  },
];

export const mockConstructors: Constructor[] = [
  {
    id: "1",
    name: "Red Bull Racing",
    nationality: "Austria",
    points: 860,
    wins: 21,
    position: 1,
    color: TEAM_COLORS["Red Bull Racing"],
    drivers: ["Max Verstappen", "Sergio Pérez"],
  },
  {
    id: "2",
    name: "Mercedes",
    nationality: "Germany",
    points: 409,
    wins: 4,
    position: 2,
    color: TEAM_COLORS["Mercedes"],
    drivers: ["Lewis Hamilton", "George Russell"],
  },
  {
    id: "3",
    name: "Ferrari",
    nationality: "Italy",
    points: 365,
    wins: 3,
    position: 3,
    color: TEAM_COLORS["Ferrari"],
    drivers: ["Charles Leclerc", "Carlos Sainz Jr."],
  },
  {
    id: "4",
    name: "Aston Martin",
    nationality: "United Kingdom",
    points: 280,
    wins: 1,
    position: 4,
    color: TEAM_COLORS["Aston Martin"],
    drivers: ["Fernando Alonso", "Lance Stroll"],
  },
  {
    id: "5",
    name: "McLaren",
    nationality: "United Kingdom",
    points: 212,
    wins: 0,
    position: 5,
    color: TEAM_COLORS["McLaren"],
    drivers: ["Lando Norris", "Oscar Piastri"],
  },
];

export const mockRaces: Race[] = [
  {
    id: "1",
    name: "Bahrain Grand Prix",
    country: "Bahrain",
    date: "2024-03-03",
    round: 1,
    circuit: "Bahrain International Circuit",
    winner: "Max Verstappen",
    winnerTime: "1:31:44.742",
    fastestLap: "Charles Leclerc",
    fastestLapTime: "1:30.252",
  },
  {
    id: "2",
    name: "Saudi Arabian Grand Prix",
    country: "Saudi Arabia",
    date: "2024-03-17",
    round: 2,
    circuit: "Jeddah Corniche Circuit",
    winner: "Max Verstappen",
    winnerTime: "1:20:43.273",
    fastestLap: "Lewis Hamilton",
    fastestLapTime: "1:29.734",
  },
  {
    id: "3",
    name: "Australian Grand Prix",
    country: "Australia",
    date: "2024-03-31",
    round: 3,
    circuit: "Albert Park Circuit",
    winner: "Carlos Sainz Jr.",
    winnerTime: "1:20:26.843",
    fastestLap: "Oscar Piastri",
    fastestLapTime: "1:19.828",
  },
  {
    id: "4",
    name: "Japanese Grand Prix",
    country: "Japan",
    date: "2024-04-14",
    round: 4,
    circuit: "Suzuka Circuit",
    winner: "Max Verstappen",
    winnerTime: "1:54:23.566",
    fastestLap: "Lewis Hamilton",
    fastestLapTime: "1:30.983",
  },
  {
    id: "5",
    name: "Chinese Grand Prix",
    country: "China",
    date: "2024-04-28",
    round: 5,
    circuit: "Shanghai International Circuit",
    winner: "Max Verstappen",
    winnerTime: "1:40:52.554",
    fastestLap: "Fernando Alonso",
    fastestLapTime: "1:32.947",
  },
];

// Generate lap time data for visualization
export const generateLapTimeData = (
  _raceId: string,
  numLaps: number = 60
): LapTime[] => {
  const drivers = mockDrivers.slice(0, 8); // Top 8 drivers
  const data: LapTime[] = [];

  drivers.forEach((driver, driverIndex) => {
    const baseTime = 90000 + driverIndex * 500; // Base lap time in ms

    for (let lap = 1; lap <= numLaps; lap++) {
      const variation = (Math.random() - 0.5) * 2000; // Random variation
      const tireWear = lap * 50; // Gradual tire wear
      const fuelEffect = Math.max(0, (60 - lap) * 20); // Fuel effect decreases over time

      const lapTime = baseTime + variation + tireWear + fuelEffect;

      data.push({
        lap,
        driver: driver.name,
        time: lapTime,
        position: driverIndex + 1,
        teamColor: driver.teamColor,
      });
    }
  });

  return data;
};

// Generate telemetry data for real-time visualization
export const generateTelemetryData = (): TelemetryData[] => {
  const drivers = mockDrivers.slice(0, 6);
  return drivers.map((driver) => ({
    driver: driver.name,
    speed: 250 + Math.random() * 80,
    throttle: Math.random() * 100,
    brake: Math.random() * 100,
    gear: Math.floor(Math.random() * 8) + 1,
    rpm: 8000 + Math.random() * 4000,
    drs: Math.random() > 0.7,
    lap: Math.floor(Math.random() * 60) + 1,
    sector: Math.floor(Math.random() * 3) + 1,
    teamColor: driver.teamColor,
  }));
};

export const mockSeasonStats: SeasonStats = {
  totalRaces: 24,
  completedRaces: 5,
  avgLapTime: 91.2,
  fastestLap: {
    driver: "Oscar Piastri",
    time: "1:19.828",
    race: "Australian Grand Prix",
  },
  totalDistance: 19840,
};

export const getMockRaceResults = (_raceId: string): RaceResult[] => {
  return mockDrivers.slice(0, 10).map((driver, index) => ({
    position: index + 1,
    driver: driver.name,
    team: driver.team,
    time: index === 0 ? "1:31:44.742" : `+${(index * 12.5).toFixed(3)}`,
    points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1][index] || 0,
    teamColor: driver.teamColor,
  }));
};
