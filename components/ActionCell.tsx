"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UserEditSheet from "@/hooks/userEditSheet";
import { User } from "@/hooks/useUsers";

type Props = {
  user: User;
};

export default function ActionCell({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <UserEditSheet
        user={user}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
