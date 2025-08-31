"use client";

import React, { useMemo } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Users, MapPin, Building, AtSign } from "lucide-react";
import Welcome from "@/components/Welcome";
import KpiCard from "@/components/KpiCard";
import UsersPerCityChart from "@/components/UsersPerCityChart";
import UsersPerCompanyChart from "@/components/UsersPerCompanyChart";

export default function Dashboard() {
  const { data: users, isLoading, isError } = useUsers();

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
    return Object.entries(companyCount).map(([name, value]) => ({ name, value }));
  }, [users]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users</p>;

  return (
    <main className="p-6">
      <Welcome />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <KpiCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UsersPerCityChart data={usersPerCity} />
        <UsersPerCompanyChart data={usersPerCompany} />
      </div>
    </main>
  );
}
