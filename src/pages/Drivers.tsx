import React, { useState } from "react";
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useF1DataContext } from "../context/F1DataContext";

const Drivers: React.FC = () => {
  const { drivers, isLoading, error, isOnline, refreshData } =
    useF1DataContext();
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"points" | "wins" | "podiums">("points");

  const sortedDrivers = [...drivers].sort((a, b) => {
    switch (sortBy) {
      case "wins":
        return b.wins - a.wins;
      case "podiums":
        return b.podiums - a.podiums;
      default:
        return b.points - a.points;
    }
  });

  const getPositionChange = (currentPos: number) => {
    // Simulate position changes
    const changes = [0, +1, -1, +2, 0, -1, +3, -2, +1, 0];
    return changes[currentPos - 1] || 0;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Driver Championship</h1>
          <p className="text-f1-gray-300 mt-2">
            Current standings and detailed driver statistics for the 2025 season
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

          <div className="h-6 w-px bg-f1-gray-600"></div>

          <label className="text-f1-gray-300 text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "points" | "wins" | "podiums")
            }
            className="bg-f1-gray-800 border border-f1-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-f1-red focus:border-transparent"
          >
            <option value="points">Championship Points</option>
            <option value="wins">Race Wins</option>
            <option value="podiums">Podium Finishes</option>
          </select>
        </div>
      </div>

      {/* Championship Standings */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-f1-gray-700/50">
          <h2 className="text-xl font-bold text-white">
            Championship Standings
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-f1-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Driver
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Team
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Points
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Wins
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Podiums
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-f1-gray-700/30">
              {sortedDrivers.map((driver, index) => {
                const positionChange = getPositionChange(driver.position);
                return (
                  <tr
                    key={driver.id}
                    className={`hover:bg-f1-gray-800/30 transition-colors cursor-pointer ${
                      selectedDriver === driver.id
                        ? "bg-f1-red/10 border-l-4 border-f1-red"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedDriver(
                        selectedDriver === driver.id ? null : driver.id
                      )
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-white">
                          {index + 1}
                        </span>
                        {index === 0 && (
                          <Trophy size={20} className="text-yellow-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-f1-gray-700 to-f1-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {driver.number}
                          </div>
                          <div>
                            <p className="text-white font-semibold">
                              {driver.name}
                            </p>
                            <p className="text-f1-gray-400 text-sm">
                              {driver.nationality}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: driver.teamColor }}
                        ></div>
                        <span className="text-white font-medium">
                          {driver.team}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-white">
                        {driver.points}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-medium">
                        {driver.wins}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-medium">
                        {driver.podiums}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {positionChange === 0 ? (
                          <span className="text-f1-gray-400">-</span>
                        ) : positionChange > 0 ? (
                          <div className="flex items-center space-x-1 text-green-400">
                            <TrendingUp size={16} />
                            <span>+{positionChange}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-red-400">
                            <TrendingUp size={16} className="rotate-180" />
                            <span>{positionChange}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
          {(() => {
            const driver = drivers.find((d) => d.id === selectedDriver);
            if (!driver) return null;

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-f1-gray-700 to-f1-gray-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {driver.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {driver.name}
                      </h3>
                      <p className="text-f1-gray-400">
                        {driver.nationality} • {driver.team}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="text-f1-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="text-yellow-400" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {driver.points}
                    </p>
                    <p className="text-f1-gray-400 text-sm">
                      Championship Points
                    </p>
                  </div>

                  <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="text-green-400" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {driver.wins}
                    </p>
                    <p className="text-f1-gray-400 text-sm">Race Wins</p>
                  </div>

                  <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Award className="text-purple-400" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {driver.podiums}
                    </p>
                    <p className="text-f1-gray-400 text-sm">Podium Finishes</p>
                  </div>

                  <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="text-blue-400" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      #{driver.position}
                    </p>
                    <p className="text-f1-gray-400 text-sm">Current Position</p>
                  </div>
                </div>

                <div className="bg-f1-gray-800/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Season Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-f1-gray-300">Points per Race</span>
                      <span className="text-white font-medium">
                        {(driver.points / 5).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-f1-gray-300">Win Rate</span>
                      <span className="text-white font-medium">
                        {((driver.wins / 5) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-f1-gray-300">Podium Rate</span>
                      <span className="text-white font-medium">
                        {((driver.podiums / 5) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Championship Battle */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          Championship Battle
        </h3>
        <div className="space-y-4">
          {drivers.slice(0, 3).map((driver, index) => {
            const pointsGap =
              index === 0 ? 0 : drivers[0].points - driver.points;
            return (
              <div key={driver.id} className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-lg font-bold text-white w-8">
                    #{index + 1}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: driver.teamColor }}
                  ></div>
                  <span className="text-white font-medium">{driver.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{driver.points} pts</p>
                  {pointsGap > 0 && (
                    <p className="text-f1-gray-400 text-sm">-{pointsGap} pts</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
