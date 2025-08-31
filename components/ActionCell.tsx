"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UserEditSheet from "@/hooks/userEditSheet";
import { User} from "@/hooks/useUsers";
import { useDeleteUser } from "@/hooks/useUsers";

type Props = {
  user: User;
};

export default function ActionCell({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>


      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id); 
          }
        }}
        disabled={isLoading} 
      >
        {isLoading ? "Deleting..." : "Delete"}
      </Button>

      <UserEditSheet
        user={user}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
