"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { User } from "@/hooks/useUsers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  website: yup.string().required(),
  company: yup.string().required(),
  city: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserCreateModal({ isOpen, onClose }: Props) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post<User>("/users", {
        ...data,
        company: { name: data.company },
        address: { city: data.city },
      });
      return res.data;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers = []) => [
        newUser,
        ...oldUsers,
      ]);
      reset();
      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px] sm:w-[540px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 py-4"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" {...register("website")} />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company")} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
          </div>

          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              Add User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
