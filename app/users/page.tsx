"use client";

import React from 'react'
import { User, columns } from "./columns";
import { DataTable } from './data-table';
import { useUsers } from "@/hooks/useUsers";



const UserPage = () => {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users</p>;
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>

      <DataTable data={data ?? []} columns={columns}/>

    </div>
  );
}

export default UserPage