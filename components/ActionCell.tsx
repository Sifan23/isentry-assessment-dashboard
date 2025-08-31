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
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  return (
    <>
      {/* View Button */}
      <Button variant="outline" size="sm" onClick={() => setViewOpen(true)}>
        View
      </Button>

      {/* Edit Button */}
      <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>
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
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      {/* View Sheet (Read-Only) */}
      <UserEditSheet
        user={user}
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        readOnly 
      />
    </>
  );
}
