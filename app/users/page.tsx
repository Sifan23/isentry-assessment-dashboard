"use client";

import React, { useState } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import UserCreateModal from "@/components/UserCreateModal";
import { Plus } from "lucide-react";

const UserPage = () => {
  const { data, isLoading, isError } = useUsers();
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users</p>;
  return (
    <div className="">
      <div className="mb-4 mt-4 flex justify-between items-center px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus />
          Add User
        </Button>
      </div>

      <DataTable data={data ?? []} columns={columns} />
      <UserCreateModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default UserPage;
