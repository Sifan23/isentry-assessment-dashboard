// components/users/ActionCell.tsx
"use client";
import React from "react";
import { User } from "@/hooks/useUsers";
import ViewButton from "@/components/buttons/ViewButton";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";

type Props = { user: User };

export default function ActionCell({ user }: Props) {
  return (
    <div className="flex items-center gap-2">
      <ViewButton user={user} />
      <EditButton user={user} />
      <DeleteButton user={user} />
    </div>
  );
}
