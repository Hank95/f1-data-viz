import React from "react";
import { Trophy, Users, TrendingUp, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { ChartContainer, StandingsBarChart } from "../components/Charts";
import { useF1DataContext } from "../context/F1DataContext";

const Constructors: React.FC = () => {
  const { constructors, drivers, isLoading, error, isOnline, refreshData } = useF1DataContext();
  
  const constructorStandingsData = constructors.map((constructor) => ({
    name: constructor.name.replace(" Racing", "").replace("Red Bull", "RB"),
    points: constructor.points,
    color: constructor.color,
  }));

  const getDriversForTeam = (teamName: string) => {
    return drivers.filter((driver) => driver.team === teamName);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Constructor Championship
          </h1>
          <p className="text-f1-gray-300 mt-2">
            Team standings and performance analysis for the 2025 Formula 1 season
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

      {/* Constructor Standings Chart */}
      <ChartContainer title="Constructor Championship Standings">
        <StandingsBarChart data={constructorStandingsData} />
        <div className="mt-4 text-sm text-f1-gray-400">
          Total points accumulated by each constructor team this season
        </div>
      </ChartContainer>

      {/* Detailed Standings Table */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-f1-gray-700/50">
          <h2 className="text-xl font-bold text-white">Team Standings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-f1-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Constructor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-f1-gray-300">
                  Drivers
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Points
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Wins
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-f1-gray-300">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-f1-gray-700/30">
              {constructors.map((constructor, index) => {
                const teamDrivers = getDriversForTeam(constructor.name);
                const pointsGap =
                  index === 0
                    ? 0
                    : constructors[0].points - constructor.points;

                return (
                  <tr
                    key={constructor.id}
                    className="hover:bg-f1-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-white">
                          {constructor.position}
                        </span>
                        {constructor.position === 1 && (
                          <Trophy size={20} className="text-yellow-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: constructor.color }}
                        ></div>
                        <div>
                          <p className="text-white font-semibold">
                            {constructor.name}
                          </p>
                          <p className="text-f1-gray-400 text-sm">
                            {constructor.nationality}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {teamDrivers.map((driver) => (
                          <div
                            key={driver.id}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-6 h-6 bg-f1-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {driver.number}
                            </div>
                            <span className="text-white text-sm">
                              {driver.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold text-white">
                        {constructor.points}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-medium">
                        {constructor.wins}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-f1-gray-400">
                        {pointsGap === 0 ? "-" : `-${pointsGap}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {constructors.slice(0, 4).map((constructor) => {
          const teamDrivers = getDriversForTeam(constructor.name);
          const avgDriverPoints =
            teamDrivers.reduce((sum, driver) => sum + driver.points, 0) /
            teamDrivers.length;

          return (
            <div
              key={constructor.id}
              className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: constructor.color }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {constructor.name}
                    </h3>
                    <p className="text-f1-gray-400">
                      #{constructor.position} in Championship
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {constructor.points}
                  </p>
                  <p className="text-f1-gray-400 text-sm">points</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="text-yellow-400" size={20} />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {constructor.wins}
                  </p>
                  <p className="text-f1-gray-400 text-xs">Race Wins</p>
                </div>

                <div className="bg-f1-gray-800/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="text-blue-400" size={20} />
                  </div>
                  <p className="text-xl font-bold text-white">
                    {avgDriverPoints.toFixed(0)}
                  </p>
                  <p className="text-f1-gray-400 text-xs">Avg Driver Points</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Users size={18} />
                  <span>Driver Lineup</span>
                </h4>
                {teamDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="flex items-center justify-between bg-f1-gray-800/30 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-f1-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {driver.number}
                      </div>
                      <div>
                        <p className="text-white font-medium">{driver.name}</p>
                        <p className="text-f1-gray-400 text-sm">
                          #{driver.position} in standings
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{driver.points}</p>
                      <p className="text-f1-gray-400 text-sm">
                        {driver.wins} wins
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Championship Analysis */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          Championship Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-f1-red">
              Dominant Performance
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: constructors[0]?.color || '#E10600' }}
                ></div>
                <div>
                  <p className="text-white font-medium">
                    {constructors[0]?.name || 'Leader'}
                  </p>
                  <p className="text-f1-gray-400 text-sm">
                    Leading by{" "}
                    {constructors[0] && constructors[1] 
                      ? constructors[0].points - constructors[1].points 
                      : 0}{" "}
                    points
                  </p>
                </div>
              </div>
              <p className="text-f1-gray-300 text-sm">
                Exceptional consistency with both drivers regularly scoring
                points.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-f1-red">Close Battle</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                {constructors.slice(1, 3).map((constructor) => (
                  <div
                    key={constructor.id}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: constructor.color }}
                    ></div>
                    <span className="text-white text-sm">
                      {constructor.name}
                    </span>
                    <span className="text-f1-gray-400 text-sm">
                      {constructor.points} pts
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-f1-gray-300 text-sm">
                Tight competition for second place in the championship.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-f1-red">Key Stats</h4>
            <div className="space-y-3 text-f1-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Total Points Scored:</span>
                <span className="text-white font-medium">
                  {constructors.reduce((sum, c) => sum + c.points, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Wins:</span>
                <span className="text-white font-medium">
                  {constructors.reduce((sum, c) => sum + c.wins, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Avg Points per Team:</span>
                <span className="text-white font-medium">
                  {constructors.length > 0 
                    ? (constructors.reduce((sum, c) => sum + c.points, 0) /
                       constructors.length
                      ).toFixed(0)
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constructors;
