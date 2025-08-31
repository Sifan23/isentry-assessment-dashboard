// components/UsersPerCompanyChart.tsx
"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, Legend, ResponsiveContainer, } from "recharts";

interface UsersPerCompanyChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

export default function UsersPerCompanyChart({ data, colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"] }: UsersPerCompanyChartProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Users per Company</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <ReTooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
