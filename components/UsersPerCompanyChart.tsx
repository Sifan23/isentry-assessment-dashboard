"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface UsersPerCompanyChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

export default function UsersPerCompanyChart({
  data,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"],
}: UsersPerCompanyChartProps) {
  // Adjust outer radius for small vs. large screens
  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth < 640;
  const outerRadius = isSmallScreen ? 70 : 100;

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg shadow w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        Users per Company
      </h2>
      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <ReTooltip />
            <Legend
              wrapperStyle={{
                fontSize: isSmallScreen ? "10px" : "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
