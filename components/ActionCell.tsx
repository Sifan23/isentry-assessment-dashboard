"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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

import { Eye, Edit, Trash2 } from "lucide-react"; // Icons for view, edit, delete
import { Button } from "@/components/ui/button";

type Props = {
  user: User;
};

export default function ActionCell({ user }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  return (
    <div className="flex items-center gap-2">
      {/* View Icon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="p-2"
            onClick={() => setViewOpen(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>View</TooltipContent>
      </Tooltip>

      {/* Edit Icon */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setEditOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>

      {/* Delete with AlertDialog */}
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="p-2"
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {user.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove{" "}
                  <span className="font-semibold">{user.name}</span> from the
                  users list.
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
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>

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
    </div>
  );
}
