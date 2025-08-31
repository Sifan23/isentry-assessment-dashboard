"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UserEditSheet from "@/hooks/userEditSheet";
import { User } from "@/hooks/useUsers";
import { useDeleteUser } from "@/hooks/useUsers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  user: User;
};

export default function ActionCell({ user }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  return (
    <>
      {/* Edit Button */}
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>

      {/* Delete with AlertDialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {user.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove{" "}
              <span className="font-semibold">{user.name}</span> from the users
              list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUser(user.id)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Sheet */}
      <UserEditSheet
        user={user}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
