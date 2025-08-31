"use client";

import React, { useMemo } from "react";
import { User } from "@/hooks/useUsers";
import { useUsers } from "@/hooks/useUsers"; 
import { Users, MapPin, Building, AtSign } from "lucide-react";

export default function Dashboard() {
  const { data: users, isLoading, isError } = useUsers();

  
  const metrics = useMemo(() => {
    if (!users) return [];
    const totalUsers = users.length;
    const uniqueCities = new Set(users.map((u) => u.address.city)).size;
    const uniqueCompanies = new Set(users.map((u) => u.company.name)).size;
    const totalEmails = users.length;

    return [
      {
        label: "Total Users",
        value: totalUsers,
        icon: Users,
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
      },
      {
        label: "Unique Cities",
        value: uniqueCities,
        icon: MapPin,
        bgColor: "bg-green-100",
        textColor: "text-green-700",
      },
      {
        label: "Companies",
        value: uniqueCompanies,
        icon: Building,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
      },
      {
        label: "Emails",
        value: totalEmails,
        icon: AtSign,
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
      },
    ];
  }, [users]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {users?.length === 0 ? (
        <p className="text-gray-500">No users data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className={`flex items-center p-4 rounded-lg shadow ${metric.bgColor}`}
              >
                <div className={`p-3 rounded-full bg-white/30 mr-4`}>
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
      )}
    </main>
  );
}
