// components/UsersPerCityChart.tsx
"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, Legend, ResponsiveContainer } from "recharts";

interface UsersPerCityChartProps {
  data: { city: string; count: number }[];
}

export default function UsersPerCityChart({ data }: UsersPerCityChartProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Users per City</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="city" />
          <YAxis />
          <ReTooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
