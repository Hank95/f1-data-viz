import React, { useState, useEffect } from "react";
import {
  ChartContainer,
  LapTimeChart,
  PerformanceTrendChart,
} from "../components/Charts";
import { generateLapTimeData, generateTelemetryData } from "../data/f1Data";
import { useF1DataContext } from "../context/F1DataContext";
import type { TelemetryData } from "../types/f1";
import {
  Activity,
  Zap,
  Gauge,
  Settings,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";

const Analytics: React.FC = () => {
  const {
    drivers,
    races,
    seasonStats,
    isLoading,
    // error,
    isOnline,
    refreshData,
  } = useF1DataContext();
  const [selectedRace, setSelectedRace] = useState("1");
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Generate lap time data for selected race
  const lapTimeData = React.useMemo(() => {
    const rawData = generateLapTimeData(selectedRace, 50);
    const processedData: Record<
      number,
      { lap: number; [driverName: string]: number }
    > = {};

    rawData.forEach((entry) => {
      if (!processedData[entry.lap]) {
        processedData[entry.lap] = { lap: entry.lap };
      }
      processedData[entry.lap][entry.driver] = entry.time;
    });

    return Object.values(processedData);
  }, [selectedRace]);

  const driverNames = drivers.slice(0, 6).map((d) => d.name);
  const driverColors = drivers.slice(0, 6).reduce(
    (acc, driver) => {
      acc[driver.name] = driver.teamColor;
      return acc;
    },
    {} as Record<string, string>
  );

  // Performance trend data
  const performanceTrendData = races
    .slice(0, seasonStats.completedRaces)
    .map((race, index) => {
      const raceData: { race: string; [key: string]: string | number } = {
        race: race.name.replace(" Grand Prix", ""),
      };
      drivers.slice(0, 4).forEach((driver) => {
        // Simulate points progression
        raceData[driver.name] = Math.max(
          0,
          driver.points - (seasonStats.completedRaces - index - 1) * 25
        );
      });
      return raceData;
    });

  // Live telemetry simulation
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setTelemetryData(generateTelemetryData());
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  useEffect(() => {
    setTelemetryData(generateTelemetryData());
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-f1-gray-300 mt-2">
            Deep dive into performance metrics, lap times, and real-time
            telemetry data
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

          <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            className="bg-f1-gray-800 border border-f1-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-f1-red focus:border-transparent"
          >
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isLiveMode
                ? "bg-f1-red text-white shadow-lg"
                : "bg-f1-gray-800 text-f1-gray-300 hover:bg-f1-gray-700"
            }`}
          >
            <Activity size={18} />
            <span>{isLiveMode ? "Live Mode ON" : "Live Mode OFF"}</span>
          </button>
        </div>
      </div>

      {/* Lap Time Analysis */}
      <ChartContainer
        title={`Lap Time Analysis - ${races.find((r) => r.id === selectedRace)?.name || "Race"}`}
      >
        <LapTimeChart
          data={lapTimeData}
          drivers={driverNames}
          colors={driverColors}
        />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-f1-gray-800/50 rounded-lg p-3">
            <p className="text-f1-gray-400">Fastest Lap</p>
            <p className="text-white font-medium">1:19.828</p>
            <p className="text-f1-gray-400 text-xs">Oscar Piastri</p>
          </div>
          <div className="bg-f1-gray-800/50 rounded-lg p-3">
            <p className="text-f1-gray-400">Average Lap</p>
            <p className="text-white font-medium">1:21.542</p>
            <p className="text-f1-gray-400 text-xs">All drivers</p>
          </div>
          <div className="bg-f1-gray-800/50 rounded-lg p-3">
            <p className="text-f1-gray-400">Tire Strategy</p>
            <p className="text-white font-medium">Medium → Hard</p>
            <p className="text-f1-gray-400 text-xs">Optimal strategy</p>
          </div>
        </div>
      </ChartContainer>

      {/* Performance Trend */}
      <ChartContainer title="Championship Points Progression">
        <PerformanceTrendChart
          data={performanceTrendData}
          drivers={drivers.slice(0, 4).map((d) => d.name)}
          colors={drivers.slice(0, 4).reduce(
            (acc, driver) => {
              acc[driver.name] = driver.teamColor;
              return acc;
            },
            {} as Record<string, string>
          )}
        />
        <div className="mt-4 text-sm text-f1-gray-400">
          Points accumulation throughout the season for top 4 championship
          contenders
        </div>
      </ChartContainer>

      {/* Real-time Telemetry */}
      <ChartContainer title="Live Telemetry Data" className="relative">
        {isLiveMode && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {telemetryData.map((data, index) => (
            <div
              key={`${data.driver}-${index}`}
              className="bg-f1-gray-800/50 rounded-lg p-4 border border-f1-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{data.driver}</h4>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: data.teamColor }}
                ></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Gauge size={16} className="text-blue-400" />
                    <span className="text-f1-gray-400 text-sm">Speed</span>
                  </div>
                  <span className="text-white font-mono">
                    {data.speed.toFixed(0)} km/h
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-green-400" />
                    <span className="text-f1-gray-400 text-sm">Throttle</span>
                  </div>
                  <span className="text-white font-mono">
                    {data.throttle.toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings size={16} className="text-orange-400" />
                    <span className="text-f1-gray-400 text-sm">Gear</span>
                  </div>
                  <span className="text-white font-mono">{data.gear}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-f1-gray-400 text-sm">RPM</span>
                  <span className="text-white font-mono">
                    {data.rpm.toFixed(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-f1-gray-400 text-sm">Sector</span>
                  <span className="text-white font-mono">S{data.sector}</span>
                </div>

                {data.drs && (
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded px-2 py-1">
                    <span className="text-purple-300 text-xs font-medium">
                      DRS ACTIVE
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-f1-gray-400 text-sm">
            {isLiveMode
              ? "Real-time telemetry data updating every 2 seconds"
              : 'Click "Live Mode ON" to enable real-time updates'}
          </p>
        </div>
      </ChartContainer>

      {/* Performance Insights */}
      <div className="bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          Performance Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-f1-red">Key Findings</h4>
            <ul className="space-y-3 text-f1-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>
                  {drivers[0]?.name || "Leader"} maintains consistent sub-1:21
                  lap times throughout the race
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>
                  Tire degradation shows optimal pit window around lap 25-30
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>
                  DRS effectiveness varies by 0.3-0.5s per lap on main straight
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-f1-red">
              Technical Analysis
            </h4>
            <ul className="space-y-3 text-f1-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>
                  Average cornering speeds increased by 8% vs last season
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>Brake temperatures optimal between 350-400°C</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-f1-red rounded-full mt-2"></div>
                <span>
                  Fuel efficiency improved with new hybrid regulations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
