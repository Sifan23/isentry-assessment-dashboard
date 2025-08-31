"use client";

import React, { useMemo } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Users, MapPin, Building, AtSign } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { data: users, isLoading, isError } = useUsers();

  // Compute metrics
  const metrics = useMemo(() => {
    if (!users) return [];
    const totalUsers = users.length;
    const uniqueCities = new Set(users.map((u) => u.address.city)).size;
    const uniqueCompanies = new Set(users.map((u) => u.company.name)).size;

    return [
      { label: "Total Users", value: totalUsers, icon: Users, bgColor: "bg-blue-100", textColor: "text-blue-700" },
      { label: "Unique Cities", value: uniqueCities, icon: MapPin, bgColor: "bg-green-100", textColor: "text-green-700" },
      { label: "Companies", value: uniqueCompanies, icon: Building, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
      { label: "Emails", value: totalUsers, icon: AtSign, bgColor: "bg-purple-100", textColor: "text-purple-700" },
    ];
  }, [users]);

  // Prepare data for charts
  const usersPerCity = useMemo(() => {
    if (!users) return [];
    const cityCount: Record<string, number> = {};
    users.forEach((u) => {
      cityCount[u.address.city] = (cityCount[u.address.city] || 0) + 1;
    });
    return Object.entries(cityCount).map(([city, count]) => ({ city, count }));
  }, [users]);

  const usersPerCompany = useMemo(() => {
    if (!users) return [];
    const companyCount: Record<string, number> = {};
    users.forEach((u) => {
      companyCount[u.company.name] = (companyCount[u.company.name] || 0) + 1;
    });
    return Object.entries(companyCount).map(([company, value]) => ({ name: company, value }));
  }, [users]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

       {/* KPI Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className={`flex items-center p-4 rounded-lg shadow ${metric.bgColor}`}>
              <div className="p-3 rounded-full bg-white/30 mr-4">
                <Icon className={`h-6 w-6 ${metric.textColor}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={`text-sm ${metric.textColor}`}>{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Users per City</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersPerCity}>
              <XAxis dataKey="city" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

       
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Users per Company</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={usersPerCompany} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {usersPerCompany.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
