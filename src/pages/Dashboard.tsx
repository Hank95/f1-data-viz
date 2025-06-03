import React from "react";
import {
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import {
  ChartContainer,
  StandingsBarChart,
  TeamDistributionChart,
} from "../components/Charts";
import { mockDrivers, mockConstructors, mockSeasonStats } from "../data/f1Data";

const Dashboard: React.FC = () => {
  // Prepare data for charts
  const driverStandingsData = mockDrivers.slice(0, 8).map((driver) => ({
    name: driver.name.split(" ").pop() || driver.name,
    points: driver.points,
    color: driver.teamColor,
  }));

  const teamPointsData = mockConstructors.map((constructor) => ({
    name: constructor.name,
    value: constructor.points,
    color: constructor.color,
  }));

  const stats = [
    {
      name: "Total Races",
      value: mockSeasonStats.totalRaces,
      change: "+2 from last season",
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      name: "Completed Races",
      value: mockSeasonStats.completedRaces,
      change: `${mockSeasonStats.completedRaces}/${mockSeasonStats.totalRaces}`,
      icon: Trophy,
      color: "text-green-400",
    },
    {
      name: "Active Drivers",
      value: mockDrivers.length,
      change: "20 drivers total",
      icon: Users,
      color: "text-purple-400",
    },
    {
      name: "Avg Lap Time",
      value: `${mockSeasonStats.avgLapTime}s`,
      change: "-0.8s from last year",
      icon: Clock,
      color: "text-orange-400",
    },
    {
      name: "Fastest Lap",
      value: mockSeasonStats.fastestLap.time,
      change: mockSeasonStats.fastestLap.driver,
      icon: Target,
      color: "text-red-400",
    },
    {
      name: "Total Distance",
      value: `${mockSeasonStats.totalDistance}km`,
      change: "This season",
      icon: TrendingUp,
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          F1 2024 Season Dashboard
        </h1>
        <p className="text-f1-gray-300 text-lg max-w-2xl mx-auto">
          Real-time analytics and insights from the Formula 1 World
          Championship. Track driver standings, team performance, and race
          statistics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6 hover:border-f1-red/30 transition-all duration-300 animate-slide-up"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-f1-gray-400 text-sm font-medium">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-f1-gray-800 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Driver Standings */}
        <ChartContainer title="Driver Championship Standings">
          <StandingsBarChart data={driverStandingsData} />
          <div className="mt-4 text-sm text-f1-gray-400">
            Current season points distribution among top 8 drivers
          </div>
        </ChartContainer>

        {/* Constructor Points Distribution */}
        <ChartContainer title="Constructor Points Distribution">
          <TeamDistributionChart data={teamPointsData} />
          <div className="mt-4 text-sm text-f1-gray-400">
            Team performance based on total championship points
          </div>
        </ChartContainer>
      </div>

      {/* Season Highlights */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Season Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-f1-red">
              Championship Leader
            </h3>
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: mockDrivers[0].teamColor }}
              ></div>
              <div>
                <p className="text-white font-medium">{mockDrivers[0].name}</p>
                <p className="text-f1-gray-400 text-sm">
                  {mockDrivers[0].points} points
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-f1-red">Most Wins</h3>
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: mockDrivers[0].teamColor }}
              ></div>
              <div>
                <p className="text-white font-medium">{mockDrivers[0].name}</p>
                <p className="text-f1-gray-400 text-sm">
                  {mockDrivers[0].wins} wins
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-f1-red">
              Leading Constructor
            </h3>
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: mockConstructors[0].color }}
              ></div>
              <div>
                <p className="text-white font-medium">
                  {mockConstructors[0].name}
                </p>
                <p className="text-f1-gray-400 text-sm">
                  {mockConstructors[0].points} points
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Performance Indicator */}
      <div className="bg-gradient-to-r from-f1-red/10 to-f1-red/5 border border-f1-red/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-f1-red rounded-full animate-pulse-slow"></div>
          <h3 className="text-lg font-semibold text-white">
            Live Season Progress
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-f1-gray-300">Season Completion</span>
            <span className="text-white font-medium">
              {(
                (mockSeasonStats.completedRaces / mockSeasonStats.totalRaces) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
          <div className="w-full bg-f1-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-f1-red to-red-600 h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${(mockSeasonStats.completedRaces / mockSeasonStats.totalRaces) * 100}%`,
              }}
            ></div>
          </div>
          <div className="text-sm text-f1-gray-400">
            {mockSeasonStats.totalRaces - mockSeasonStats.completedRaces} races
            remaining in the championship
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
