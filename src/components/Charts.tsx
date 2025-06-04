import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className = "",
}) => (
  <div
    className={`bg-f1-gray-900/50 backdrop-blur-sm rounded-xl border border-f1-gray-700/50 p-6 ${className}`}
  >
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

interface StandingsBarChartProps {
  data: Array<{
    name: string;
    points: number;
    color: string;
  }>;
}

export const StandingsBarChart: React.FC<StandingsBarChartProps> = ({
  data,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis
        dataKey="name"
        stroke="#9CA3AF"
        fontSize={12}
        angle={-45}
        textAnchor="end"
        height={80}
      />
      <YAxis stroke="#9CA3AF" fontSize={12} />
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          color: "#F9FAFB",
        }}
        labelStyle={{ color: "#F9FAFB" }}
        itemStyle={{ color: "#F9FAFB" }}
      />
      <Bar dataKey="points" radius={[4, 4, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

interface LapTimeChartProps {
  data: Array<{
    lap: number;
    [key: string]: number | string;
  }>;
  drivers: string[];
  colors: Record<string, string>;
}

export const LapTimeChart: React.FC<LapTimeChartProps> = ({
  data,
  drivers,
  colors,
}) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis
        dataKey="lap"
        stroke="#9CA3AF"
        fontSize={12}
        label={{
          value: "Lap",
          position: "insideBottom",
          offset: -5,
          style: { textAnchor: "middle", fill: "#9CA3AF" },
        }}
      />
      <YAxis
        stroke="#9CA3AF"
        fontSize={12}
        domain={["dataMin - 1000", "dataMax + 1000"]}
        tickFormatter={(value) => `${(value / 1000).toFixed(1)}s`}
        label={{
          value: "Lap Time",
          angle: -90,
          position: "insideLeft",
          style: { textAnchor: "middle", fill: "#9CA3AF" },
        }}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          color: "#F9FAFB",
        }}
        labelStyle={{ color: "#F9FAFB" }}
        itemStyle={{ color: "#F9FAFB" }}
        labelFormatter={(value) => `Lap ${value}`}
        formatter={(value: number) => [`${(value / 1000).toFixed(3)}s`, "Time"]}
      />
      <Legend />
      {drivers.map((driver) => (
        <Line
          key={driver}
          type="monotone"
          dataKey={driver}
          stroke={colors[driver]}
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

interface TeamDistributionProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const TeamDistributionChart: React.FC<TeamDistributionProps> = ({
  data,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        dataKey="value"
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          color: "#F9FAFB",
        }}
        labelStyle={{ color: "#F9FAFB" }}
        itemStyle={{ color: "#F9FAFB" }}
      />
    </PieChart>
  </ResponsiveContainer>
);

interface PerformanceTrendProps {
  data: Array<{
    race: string;
    [key: string]: number | string;
  }>;
  drivers: string[];
  colors: Record<string, string>;
}

export const PerformanceTrendChart: React.FC<PerformanceTrendProps> = ({
  data,
  drivers,
  colors,
}) => (
  <ResponsiveContainer width="100%" height={350}>
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis
        dataKey="race"
        stroke="#9CA3AF"
        fontSize={12}
        angle={-45}
        textAnchor="end"
        height={80}
      />
      <YAxis
        stroke="#9CA3AF"
        fontSize={12}
        label={{
          value: "Points",
          angle: -90,
          position: "insideLeft",
          style: { textAnchor: "middle", fill: "#9CA3AF" },
        }}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          border: "1px solid #374151",
          borderRadius: "8px",
          color: "#F9FAFB",
        }}
        labelStyle={{ color: "#F9FAFB" }}
        itemStyle={{ color: "#F9FAFB" }}
      />
      <Legend />
      {drivers.map((driver) => (
        <Area
          key={driver}
          type="monotone"
          dataKey={driver}
          stackId="1"
          stroke={colors[driver]}
          fill={colors[driver]}
          fillOpacity={0.6}
        />
      ))}
    </AreaChart>
  </ResponsiveContainer>
);
