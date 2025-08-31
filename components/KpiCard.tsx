// components/KpiCard.tsx
"use client";
import React from "react";

interface KpiCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
}

export default function KpiCard({ label, value, icon: Icon, bgColor, textColor }: KpiCardProps) {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow ${bgColor}`}>
      <div className="p-3 rounded-full bg-white/30 mr-4">
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm ${textColor}`}>{label}</p>
      </div>
    </div>
  );
}
