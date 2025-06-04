import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Zap,
  Flag,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useF1DataContext } from "../context/F1DataContext";
import { format } from "date-fns";
import type { RaceResult } from "../types/f1";

const Races: React.FC = () => {
  const {
    races,
    seasonStats,
    isLoading,
    // error,
    isOnline,
    refreshData,
    getRaceResults,
  } = useF1DataContext();
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);

  const formatRaceDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  // Fetch race results when a race is selected
  useEffect(() => {
    if (selectedRace) {
      getRaceResults("current", selectedRace).then(setRaceResults);
    }
  }, [selectedRace, getRaceResults]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Race Calendar & Results
          </h1>
          <p className="text-f1-gray-300 mt-2">
            Complete 2025 Formula 1 race schedule with detailed results and
            statistics
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi size={16} className="text-green-400" />
            ) : (
              <WifiOff size={16} className="text-orange-400" />
            )}
            <span className="text-sm text-f1-gray-400">
              {isOnline ? "Live Data" : "Demo Mode"}
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="p-2 rounded-lg bg-f1-gray-800 hover:bg-f1-gray-700 text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Season Progress */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Season Progress</h2>
          <div className="text-right">
            <p className="text-white font-bold">
              {seasonStats.completedRaces} / {seasonStats.totalRaces}
            </p>
            <p className="text-f1-gray-400 text-sm">Races completed</p>
          </div>
        </div>
        <div className="w-full bg-f1-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-f1-red to-red-600 h-3 rounded-full transition-all duration-1000"
            style={{
              width: `${(seasonStats.completedRaces / seasonStats.totalRaces) * 100}%`,
            }}
          ></div>
        </div>
        <div className="mt-3 text-sm text-f1-gray-400">
          {seasonStats.totalRaces - seasonStats.completedRaces} races remaining
          in the 2025 championship
        </div>
      </div>

      {/* Race Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {races.map((race) => (
          <div
            key={race.id}
            className={`bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
              selectedRace === race.id
                ? "border-f1-red shadow-lg shadow-f1-red/20"
                : "border-f1-gray-700/50 hover:border-f1-red/30"
            }`}
            onClick={() =>
              setSelectedRace(selectedRace === race.id ? null : race.id)
            }
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {race.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-f1-gray-400 text-sm">
                    <MapPin size={14} />
                    <span>{race.country}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-f1-red text-white text-xs font-bold px-2 py-1 rounded">
                    R{race.round}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-blue-400" />
                  <span className="text-white text-sm">
                    {formatRaceDate(race.date)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Flag size={16} className="text-green-400" />
                  <span className="text-white text-sm">{race.circuit}</span>
                </div>

                <div className="border-t border-f1-gray-700 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy size={16} className="text-yellow-400" />
                      <span className="text-f1-gray-400 text-sm">Winner</span>
                    </div>
                    <span className="text-white font-semibold">
                      {race.winner}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-purple-400" />
                    <span className="text-f1-gray-400 text-sm">Time</span>
                  </div>
                  <span className="text-white text-sm">{race.winnerTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-orange-400" />
                    <span className="text-f1-gray-400 text-sm">
                      Fastest Lap
                    </span>
                  </div>
                  <span className="text-white text-sm">{race.fastestLap}</span>
                </div>
              </div>

              {selectedRace === race.id && (
                <div className="mt-4 pt-4 border-t border-f1-gray-700">
                  <p className="text-f1-gray-400 text-sm">
                    Click to view detailed results
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Race Results */}
      {selectedRace && (
        <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 overflow-hidden">
          {(() => {
            const race = races.find((r) => r.id === selectedRace);
            const results = raceResults;

            if (!race) return null;

            return (
              <>
                <div className="px-6 py-4 border-b border-f1-gray-700/50 bg-f1-gray-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {race.name} - Race Results
                      </h2>
                      <p className="text-f1-gray-400 mt-1">
                        {formatRaceDate(race.date)} • {race.circuit}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRace(null)}
                      className="text-f1-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-f1-gray-800/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                          Pos
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                          Driver
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                          Team
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                          Time/Gap
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-f1-gray-700/30">
                      {results.map((result) => (
                        <tr
                          key={`${result.position}-${result.driver}`}
                          className="hover:bg-f1-gray-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl font-bold text-white">
                                {result.position}
                              </span>
                              {result.position === 1 && (
                                <Trophy size={18} className="text-yellow-400" />
                              )}
                              {result.position === 2 && (
                                <Trophy size={18} className="text-gray-400" />
                              )}
                              {result.position === 3 && (
                                <Trophy size={18} className="text-amber-600" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-white font-semibold">
                              {result.driver}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: result.teamColor }}
                              ></div>
                              <span className="text-white">{result.team}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-white font-mono">
                              {result.time}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-white font-bold">
                              {result.points}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-f1-gray-700/50 bg-f1-gray-800/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-f1-gray-400">Race Winner</p>
                      <p className="text-white font-semibold">{race.winner}</p>
                      <p className="text-f1-gray-400 text-xs">
                        Time: {race.winnerTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-f1-gray-400">Fastest Lap</p>
                      <p className="text-white font-semibold">
                        {race.fastestLap}
                      </p>
                      <p className="text-f1-gray-400 text-xs">
                        Time: {race.fastestLapTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-f1-gray-400">Circuit</p>
                      <p className="text-white font-semibold">{race.circuit}</p>
                      <p className="text-f1-gray-400 text-xs">{race.country}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Upcoming Races Preview */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Next Races</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Miami Grand Prix",
              date: "2025-05-04",
              country: "United States",
            },
            {
              name: "Emilia Romagna Grand Prix",
              date: "2025-05-18",
              country: "Italy",
            },
            {
              name: "Monaco Grand Prix",
              date: "2025-05-25",
              country: "Monaco",
            },
          ].map((race, index) => (
            <div key={race.name} className="bg-f1-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{race.name}</h4>
                <span className="text-f1-gray-400 text-sm">
                  R{seasonStats.completedRaces + index + 1}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-f1-gray-400 text-sm">
                  <Calendar size={14} />
                  <span>{formatRaceDate(race.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-f1-gray-400 text-sm">
                  <MapPin size={14} />
                  <span>{race.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Races;
