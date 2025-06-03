export interface Driver {
  id: string;
  name: string;
  team: string;
  nationality: string;
  number: number;
  points: number;
  wins: number;
  podiums: number;
  position: number;
  teamColor: string;
}

export interface Constructor {
  id: string;
  name: string;
  nationality: string;
  points: number;
  wins: number;
  position: number;
  color: string;
  drivers: string[];
}

export interface Race {
  id: string;
  name: string;
  country: string;
  date: string;
  round: number;
  circuit: string;
  winner: string;
  winnerTime: string;
  fastestLap: string;
  fastestLapTime: string;
}

export interface LapTime {
  lap: number;
  driver: string;
  time: number; // in milliseconds
  position: number;
  teamColor: string;
}

export interface RaceResult {
  position: number;
  driver: string;
  team: string;
  time: string;
  points: number;
  teamColor: string;
}

export interface SeasonStats {
  totalRaces: number;
  completedRaces: number;
  avgLapTime: number;
  fastestLap: {
    driver: string;
    time: string;
    race: string;
  };
  totalDistance: number;
}

export interface TelemetryData {
  driver: string;
  speed: number;
  throttle: number;
  brake: number;
  gear: number;
  rpm: number;
  drs: boolean;
  lap: number;
  sector: number;
  teamColor: string;
}
