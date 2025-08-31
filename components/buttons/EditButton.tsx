
"use client";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import UserEditSheet from "@/hooks/userEditSheet";
import { Edit } from "lucide-react";
import { User } from "@/hooks/useUsers";

type Props = { user: User };

export default function EditButton({ user }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2" onClick={() => setOpen(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>

      <UserEditSheet user={user} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
